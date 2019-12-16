import * as axios from 'axios';
const http = axios.default;

export class LoggedInGuard{
    public static isLoggedIn = async (_, __, next) => (await http.get('/authenticated')).data ? next() : null;
}