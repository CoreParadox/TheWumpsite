import { prop, Typegoose, Ref } from 'typegoose';
import { Character } from './character';
import { User } from './user';

export class Profile extends Typegoose {
    @prop({ required: false, index: false, unique: false })
    public PreferredName: string;

    @prop({ index: false, unique: false })
    public Description: string;

    @prop({ index: false, unique: false, required: true })
    public Pronoun: string;

    @prop({ index: false, unique: false })
    public Roles: {Tank: boolean; Healer: boolean; DPS: boolean;} = {
        Tank: false,
        Healer: false,
        DPS: false,
    };

    @prop({ index: false, unique: false, required: false })
    public Housing: string;

    @prop({ref: User})
    public User?: Ref<User>;

    @prop({ ref: Character })
    public Character?: Ref<Character>;

}
