import { Typegoose, ModelType, Func } from 'typegoose';
import { Mongoose } from 'mongoose';

export class ModelService<T extends Typegoose>{
    protected model: T;
    protected service: ModelType<T>;

    constructor(model: (new () => T), mongoose: Mongoose) {
        this.model = new model();
        this.service = new model().getModelForClass(model, { existingMongoose: mongoose });;
    }

    public FindOrCreate(obj: T, propName: string) {
        return new Promise<T>((resolve, reject) => {
            this.Get(obj[propName], propName).then((m: T) => {
                m ? resolve(m) : this.Create(obj).then((o: T) => resolve(o));
            }).catch(reject);
        });
    }

    public Create = (obj: T) => new this.service(obj).save();

    public Find = (predicate: (() => boolean)) => this.service.$where(predicate);

    public Update = (obj, propName) => this.service.findOneAndUpdate({ [propName]: obj[propName] }, obj);

    public Get = (obj, propName) => this.service.findOne({ [propName]: obj[propName] }).then(u => u);

    public Delete = (value, propName) => this.service.deleteOne({ [propName]: value }).then(u => u);
    // console.log(`deleting ${[propName]} ${value}`);

    public GetAll = () => this.service.find();

}
