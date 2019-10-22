import { Typegoose, ModelType } from 'typegoose';
import { Mongoose } from 'mongoose';

export class ModelService<T extends Typegoose>{
    protected model: T;
    protected service: ModelType<T>;

    constructor(model: (new () => T), mongoose: Mongoose) {
        this.model = new model();
        this.service = new model().getModelForClass(model, { existingMongoose: mongoose });;
    }

    public async FindOrCreate(obj: T, propName: string) {
        var res = await this.Get(obj[propName], propName);
        console.log(res);
        return res != null ? res : await this.Create(obj);
    }

    public Create = (obj: T) => new this.service(obj).save();

    public Find = (predicate: (() => boolean)) => this.service.$where(predicate);

    public Update = (obj, propName) => this.service.findOneAndUpdate({ [propName]: obj[propName] }, obj);

    public Get = (obj, propName) => this.service.findOne({ [propName]: obj[propName] }).then(u => u);

    public Delete = (value, propName) => this.service.deleteOne({ [propName]: value }).then(u => u);
    // console.log(`deleting ${[propName]} ${value}`);

    public GetAll = () => this.service.find();

}
