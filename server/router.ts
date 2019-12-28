import express = require('express');
import { DataService } from './dataservice/DataService';
import { Profile } from './models/profile';
import { Typegoose, isDocument } from 'typegoose';
import { User } from './models/user';
import { Character } from './models/character';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/resources', async (req, res) => {
    res.json([
        {
            url: 'http://wiki.wump.me/',
            name: 'Wump Wiki',
        },
        {
            url: 'http://discord.wump.me/',
            name: 'Wump Discord',
        },
        {
            url: 'https://plug.dj/-3434413399982208457',
            name: 'Wump Plug.Dj',
        },
        {
            url: 'https://app.jqbx.fm/room/way-of-the-wump',
            name: 'Wump JQBX',
        },
        {
            url: 'https://steamcommunity.com/groups/WayoftheWump',
            name: 'Wump Steam Group',
        },
    ]);
});

router.get('/publicResources', async (req, res) => {
    res.json([
        {
            url: 'ffxiv.consolegameswiki.com/',
            name: 'FFXIV Console Games Wiki',
        },
        {
            url: 'https://ffxiv.gamerescape.com/wiki/Main_Page',
            name: 'FFXIV Gamer Escape Wiki',
        },
        {
            url: 'http://ffxiv.ariyala.com/',
            name: 'Ariyala\'s Toolkit',
        },
        {
            url: 'http://www.garlandtools.org/',
            name: 'Garland Tools',
        },
        {
            url: 'http://xivdb.com/',
            name: 'XIV DB',
        },
    ]);
});

router.get('/isWump', async (req, res) => {
    const user = await GetUser(req);
    const isWump = user.Servers.some((s) => s.Id === '282244165843156993');
    res.send(isWump);
});

router.put('/profile', async (req: any, res) => {
    let profile;
    let user = await GetUser(req);
    DataService.UserService.Transaction(async () => {
        if (user.Profile) {
            profile = await (await DataService.ProfileService.Update(user.Profile, '_id', req.body)).save();
        } else {
            profile = await DataService.ProfileService.Create(req.body);
            user.Profile = profile._id;
            user.save();
        }
    });
    res.json(profile);
});

router.get('/user/:id', async(req, res) => {
    let user = await DataService.UserService.GetAndPopulate(req.params.id, 'UserId', 'Profile.Character');
    isDocument(user);
    user.Servers = null;
    res.json(user);
})

router.get('/users', async (req, res) => {
    var users: User[] = await DataService.UserService.GetAll()
        .populate(DataService.UserService.BuildPopulation('Profile.Character')).exec();
    res.json(users.map((u: any) => {
        return {
            FirstName: u.Profile.Character.FirstName,
            LastName: u.Profile.Character.LastName,
            PreferredName: u.Profile.PreferredName,
            Pronouns: u.Profile.Pronoun,
            Id: u.UserId,
        }
    }));
});

router.get('/profile', async (req: any, res) => {
    let user = await GetUser(req);
    user = await user.populate('Profile').execPopulate();
    res.json(user.Profile);
});

router.get('/character', async (req: any, res) => {
    let id = req.session.passport.user;
    let user: any = await DataService.UserService.GetAndPopulate(id, 'UserId', 'Profile.Character');
    res.json(user.Profile.Character);
});

// TODO: there is probably a better way to edit a sub-sub document
router.put('/character', async (req: any, res) => {
    let character;
    let user = await GetUser(req);
    let profile = await DataService.ProfileService.Get(user.Profile, '_id');
    DataService.UserService.Transaction(async () => {
        req.body._id = profile.Character;
        if (profile.Character) {
            character = (await DataService.CharacterService.Update(profile.Character, '_id', req.body)).save();
        } else {
            character = await DataService.CharacterService.Create(req.body);
            profile.Character = character._id;
            profile.save();
        }
    });
    res.json(character);
});

let GetUser = async (req) => await DataService.UserService.Get(req.session.passport.user, 'UserId');

module.exports = router;
