import { prop, Typegoose, Ref } from 'typegoose';

export class Application extends Typegoose {
    @prop({ required: true, index: true, unique: false })
    public CharacterName: string;

    @prop({ required: true, index: true, unique: false })
    public DiscordName: string;

    @prop({ index: false, unique: false, required: true })
    public FavoriteColor: string;

    @prop({ index: false, unique: false, required: false })
    public Values: string;

    @prop({ index: false, unique: false, required: true })
    public ReadRules: boolean;

    @prop({ index: false, unique: false, required: false })
    public Additional: string;

}
