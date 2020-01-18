import { prop, Typegoose, Ref } from 'typegoose';
import { User } from './user';

export class Event extends Typegoose {
    @prop({ required: true, index: false, unique: false })
    public start: Date;

    @prop({ index: true, unique: false, required: true })
    public end: Date;

    @prop({ index: true, unique: false, required: true })
    public title: string;

    @prop({ index: false, unique: false, required: false })
    public class: string;

    @prop({ index: false, unique: false, required: false })
    public content: string;

    @prop({ index: false, unique: false, required: false })
    public background: boolean = false;

    @prop({ index: false, unique: false, required: true })
    public user: User;

}
