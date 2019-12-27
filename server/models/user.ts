import { prop, Typegoose, Ref } from 'typegoose';
import { Character } from './character';
import { Profile } from './profile';

export class User extends Typegoose {
    @prop({ index: true, unique: true, required: true })
    public Email!: string;

    @prop()
    public Username!: string;

    @prop()
    public Verified!: boolean;

    @prop({ index: true, unique: true, required: true })
    public AccessToken!: string;

    @prop({ index: true, unique: true, required: true})
    public UserId!: string;

    @prop({ ref: Profile })
    public Profile?: Ref<Profile>;

    @prop({index: false, unique: false, required: true})
    public Servers!: Server[];

}

export class Server{
    public Id:string;
    public Name:string;
    public Owner:boolean;
}

