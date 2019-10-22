const express = require('express');
const session = require('express-session');
import * as router from './router';
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { DataService } from './dataService/DataService';
import { DiscordAuth } from './auth/DiscordAuth';
import { MongoDelegate } from './auth/AuthDelegate';

export class Server {
    private app = express();

    constructor() {
        const auth = new DiscordAuth(this.app, require('./config/AuthConfig.json'), new MongoDelegate());
        this.app.use('/api', auth.ensureAuthenticated, router.api);
        this.app.use(bodyParser.json());
        this.app.use(session({
            secret: 'blahblahblah',
            saveUninitialized: true,
            resave: true,
        }));

        this.app.use(express.static(path.join(__dirname, 'dist')));

        this.app.use((req, res, next) => {
            res.locals.login = (req).isAuthenticated();
            next();
        });

        this.app.get(['/unauthorized', '/fail'], (req, res) => {
            res.sendStatus(403);
        });

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'dist/index.html'));
        });

        this.app.use((e, req, res, next) => {
            console.log(e);
            res.sendStatus(400);
        });
    }

    public start() {
        this.app.listen(3000);
        console.log('listening on port %d', 3000);
    }
}
