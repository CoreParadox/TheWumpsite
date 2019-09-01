import { AuthDelegate } from "google-auth-wrapper";
import { DataService } from '@/dataservice/DataService';
export class MongoDelegate implements AuthDelegate {

    public serialize(user) {
        return DataService.UserService.FindOrCreate(
            { Email: user.email.value, ProviderId: user.id }, 'providerId');
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
