import express = require('express');
import { DataService } from './dataservice/DataService';
import { Profile } from './models/profile';
import { Typegoose, isDocument } from 'typegoose';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('api works');
});

this.app.get('/isWump', async (req, res) => {
    const user = await User(req);
    const isWump = user.Servers.some(s => s.Id === '282244165843156993');
    res.send(isWump);
})


router.get('/resources', (req, res) => {
    res.json({});
});

router.put('/profile', async (req: any, res) => {
    let profile;
    let user = await User(req);
    DataService.UserService.Transaction(async () => {
        if(user.Profile){
            profile = await (await DataService.ProfileService.Update(user.Profile, '_id', req.body)).save();
        } else{
            profile = await DataService.ProfileService.Create(req.body);
            user.Profile = profile._id;
            user.save();
        }
    });
    res.json(profile);
});

router.get('/profile', async (req: any, res) => {
    let user = await User(req);
    user = await user.populate('Profile').execPopulate();
    res.json(user.Profile);
});

router.get('/character', async (req: any, res) => {
    var id = req.session.passport.user;
    let user: any = await DataService.UserService.GetAndPopulate(id, 'UserId', 'Profile.Character');
    res.json(user.Profile.Character);
});

// TODO: there is probably a better way to edit a sub-sub document
router.put('/character', async (req: any, res) => {
    let character;
    let user = await User(req);
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

let User = async (req) => await DataService.UserService.Get(req.session.passport.user, 'UserId');

module.exports = router;
