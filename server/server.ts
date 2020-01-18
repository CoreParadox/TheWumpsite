const express = require('express');
const session = require('express-session');
import router = require('./router');
import * as path from 'path';
import * as bodyParser from 'body-parser';
import { DiscordAuth } from './auth/DiscordAuth';
import { MongoDelegate } from './auth/AuthDelegate';
import { DataService } from './dataService/DataService';
const cookieParser = require('cookie-parser')();

export class Server {
    private app = express();

    constructor() {
        const authConfig = require('./config/AuthConfig.json');
        this.app.use(cookieParser);
        this.app.use(bodyParser.json());
        this.app.use(session({
            secret: authConfig.sessionSecret,
            saveUninitialized: true,
            resave: true,
        }));
        const auth = new DiscordAuth(this.app, authConfig, new MongoDelegate());
        this.app.use(express.static(path.join(__dirname, '..', 'dist')));
        this.app.use((req, res, next) => {
            res.locals.login = (req).isAuthenticated();
            next();
        });
        this.app.post('/api/application', async (req: any, res) => {
            let application = await DataService.ApplicationService.Create(req.body);
            res.json(application);
        });
        this.app.get('/api/publicResources', async (req, res) => {
            res.json([
                {
                    url: 'https://ffxiv.consolegameswiki.com/',
                    name: 'FFXIV Console Games Wiki',
                    className: 'console-games-wiki',
                },
                {
                    url: 'https://ffxiv.gamerescape.com/wiki/Main_Page',
                    name: 'FFXIV Gamer Escape Wiki',
                    className: 'gamer-escape',
                },
                {
                    url: 'http://ffxiv.ariyala.com/',
                    name: 'Ariyala\'s Toolkit',
                    className: 'ariyalas-toolkit',
                },
                {
                    url: 'http://www.garlandtools.org/',
                    name: 'Garland Tools',
                    className: 'garland-tools',
                }
            ]);
        });

        this.app.get('/logout', (req) => {
           req.logout();
        });

        this.app.use('/api', auth.ensureAuthenticated, router);
        this.app.get(['/unauthorized', '/fail'], (req, res) => res.sendStatus(403));

        this.app.get('/authenticated', (req, res) => res.send(auth.isAuthenticated(req, res)))


        this.app.get('*', (req, res) => res.sendFile(path.join(__dirname, '../dist/index.html')));

        this.app.use((e, req, res, next) => res.sendStatus(400));
    }

    public start() {
        this.app.listen(6900);
        console.log('listening on port %d', 6900);
    }
}
