import express = require('express');
import { DataService } from './dataservice/DataService';
import { User } from './models/user';

const router = express.Router();

router.get('/', (req, res) => {
    res.send('api works');
});

router.get('/resources', (req, res) => {
    res.json({});
});

router.put('/profile', async (req: any, res) => {
    let profile;
    let id = req.session.passport.user;
    let user = await DataService.UserService.Get(id, 'UserId');
    DataService.UserService.Transaction(async () => {
        profile = await DataService.ProfileService.Create(req.body);
        user.Profile = profile._id;
        user.save();
    });
    res.json(JSON.stringify(profile));
});
module.exports = router;
