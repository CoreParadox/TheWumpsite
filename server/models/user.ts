import { prop, Typegoose, Ref } from 'typegoose';
import { Character } from './character';
import { Profile } from './profile';

export class User extends Typegoose {
    @prop({ index: true, unique: true, required: true })
    public Email!: string;

    @prop({ index: true, unique: true, required: true })
    public AccessToken!: string;

    @prop({ index: true, unique: true, required:true})
    public UserId!: string;

    @prop({ref: Profile})
    public Profile?: Ref<Profile>;

}

