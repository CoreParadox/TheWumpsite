import { AuthDelegate } from 'google-auth-wrapper';
import { DataService } from '../dataservice/DataService';
import { User } from '../models/user';
export class MongoDelegate implements AuthDelegate {

    public serialize(user) {
        console.log(user);
        const u = new User();
        u.Email = user.email;
        u.ProviderId = user.accessToken;
        console.log(u);
        return DataService.UserService.FindOrCreate(u, 'ProviderId');
    }

    public deserialize(id) {
        return DataService.UserService.Get({ ProviderId: id }, 'ProviderId');
    };

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
