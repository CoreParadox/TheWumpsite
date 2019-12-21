import { Typegoose, ModelType } from 'typegoose';
import { Mongoose } from 'mongoose';

export class ModelService<T extends Typegoose> {
    protected model: T;
    protected service: ModelType<T>;
    protected mongoose: Mongoose;

    constructor(model: (new () => T), mongoose: Mongoose) {
        this.model = new model();
        this.mongoose = mongoose;
        this.service = new model().getModelForClass(model, { existingMongoose: this.mongoose });
    }

    public async Transaction(delegate: () => void) {
        const session = this.mongoose.startSession();
        (await session).startTransaction();
        try {
            await delegate();
            (await session).commitTransaction();
        } catch (e) {
            (await session).abortTransaction();
        } finally {
            if ((await session).inTransaction()) {
                (await session).abortTransaction();
            }
        }
    }

    public async GetOrCreate(obj: T, propName: string) {
        const res = await this.Get(obj[propName], propName);
        return res != null ? res : await this.Create(obj);
    }

    public Create = (obj: T) => new this.service(obj).save();

    public Find = (predicate: (() => boolean)) => this.service.$where(predicate);

    public Update = (obj, propName) => this.service.findOneAndUpdate({ [propName]: obj[propName] }, obj);

    public Get = (obj, propName) => this.service.findOne({ [propName]: obj }).then((u) => u);

    public Delete = (value, propName) => this.service.deleteOne({ [propName]: value }).then((u) => u);
    // console.log(`deleting ${[propName]} ${value}`);
    public GetAll = () => this.service.find();

}
