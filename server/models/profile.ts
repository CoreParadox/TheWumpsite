import { prop, Typegoose } from 'typegoose';
import { Character } from './character';

export class Profile extends Typegoose {

    @prop({ required: false, index: false, unique: false })
    public PreferredName: string;

    @prop({ index: false, unique: false })
    public Description: string;

    @prop({ index: false, unique: false, required: true })
    public Pronoun: string;

    @prop({ index: false, unique: false })
    public Roles: string[];

    @prop({ index: false, unique: false, required: false })
    public Housing: string;

    @prop({ index: false, unique: false })
    public Character: Character;

}