import { prop, Typegoose } from 'typegoose';
import { Character } from './character';
import { Profile } from './profile';

export class User extends Typegoose {
    @prop({ index: true, unique: true, required: true })
    public Email!: string;

    @prop({ index: true, unique: true, required: true })
    public ProviderId!: string;

    @prop({ index: true, unique: true, required: false })
    public Profile?: Profile;

}

