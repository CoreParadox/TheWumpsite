import { AuthDelegate } from 'google-auth-wrapper';
import { DataService } from '../dataservice/DataService';
import { User } from '../models/user';
export class MongoDelegate implements AuthDelegate {

    public serialize(user) {
        const u = new User();
        u.Email = user.email;
        u.AccessToken = user.accessToken;
        u.UserId = user.id;
        return DataService.UserService.GetOrCreate(u, 'UserId');
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
