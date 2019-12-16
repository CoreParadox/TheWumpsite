import { prop, Typegoose } from 'typegoose';

export class Character extends Typegoose {

    @prop({ index: true, unique: true })
    public Race: ['Hyur', 'Elezen', 'Lalafell', 'Miqo\'te', 'Roegadyn', 'Au Ra', 'Viera', 'Hrothgar'];

    @prop({ index: false, unique: false })
    public Gender: ['Male', 'Female', 'Other'];

    @prop({ required: false, index: true, unique: false })
    public FirstName: string;

    @prop({ required: false, index: true, unique: false })
    public LastName: string;

    @prop({ index: false, unique: false, required: false })
    public Description: string;
}



