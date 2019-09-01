import * as express from 'express';

export function api() {
    const router = express.Router();

    router.get('/', (req, res) => {
        res.send('api works');
    });

    router.get('/resources', (req, res) => {
        res.json({});
    });

}
