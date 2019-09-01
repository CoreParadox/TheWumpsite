import { AuthDelegate } from 'google-auth-wrapper';
import { DataService } from '@/dataservice/DataService';
import { User } from '@/models/user';
export class MongoDelegate implements AuthDelegate {

    public serialize(user) {
        const u = new User();
        u.Email = user.email.value;
        u.ProviderId = user.providerId;
        return DataService.UserService.FindOrCreate(u, 'providerId');
    }

    public deserialize(id) {
        return DataService.UserService.Get({ providerId: id }, 'providerId');
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
