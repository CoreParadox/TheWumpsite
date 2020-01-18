import { AuthDelegate } from 'google-auth-wrapper';
import { DataService } from '../dataService/DataService';
import { User } from '../models/user';
export class MongoDelegate implements AuthDelegate {

    public serialize(user) {
        const u = new User();
        u.Verified = user.verified;
        u.Username = user.username + user.discriminator;
        u.Servers = (user.guilds as any[]).map(g => {
            return {Id: g.id, Name: g.name, Owner: g.owner};
        });
        u.Email = user.email;
        u.AccessToken = user.accessToken;
        u.UserId = user.id;
        if (u.Servers.find(s => s.Id == "282244165843156993")){
            return DataService.UserService.GetOrCreate(u, 'UserId');
        };
    }

    public deserialize(id) {
        return DataService.UserService.Get(id , 'UserId');
    }

    public accessFailed(profile) {
        return new Promise<void>((res, rej) => {
            if (profile) {
                res();
            } else {
                rej();
            }
        });
    }
}
