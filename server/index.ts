import * as express from 'express';
import * as session from 'express-session';
import * as router from "./router";
import * as path from "path";
import * as bodyParser from "body-parser"
import { DataService } from '../dataService/DataService';
import { MongoDelegate } from './AuthDelegate';
import { DiscordAuth } from './auth/DiscordAuth';
import { start } from 'pm2';

export class Server {
    private app = express();

    constructor() {
        var auth = new DiscordAuth(this.app, require('./authConfig.json'), new MongoDelegate());
        this.app.use(<any>'/api', <any>auth.ensureAuthenticated, router.api())
        this.app.use(bodyParser.json());
        this.app.use(session({
            secret: 'blahblahblah',
            saveUninitialized: true,
            resave: true
        }));

        this.app.use(express.static(path.join(__dirname, 'dist')));

        this.app.use(function (req, res, next) {
            res.locals.login = (<any>req).isAuthenticated();
            next();
        });

        this.app.get(['/unauthorized', '/login', '/fail'], function (req, res) {
            res.sendStatus(403);
        });

        this.app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, 'dist/index.html'));
        })

        this.app.use(function (e, req, res, next) {
            console.log(e)
            res.sendStatus(400);
        });
    }

    start() {
        this.app.listen(3000);
        console.log("listening on port %d", 3000);
    }
}