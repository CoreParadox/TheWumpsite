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
        const session = await this.mongoose.startSession();
        session.startTransaction();
        try {
            delegate();
            session.commitTransaction();
        } catch (e) {
            session.abortTransaction();
        } finally {
            if (session.inTransaction()) {
                session.abortTransaction();
            }
        }
    }

    public async GetOrCreate(obj: T, propName: string) {
        const res = await this.Get(obj[propName], propName);
        if (res != null && res !== obj) {
            (await this.Update(obj[propName], propName, obj)).save();
        }
        return res != null ? res : await this.Create(obj);
    }

    public Create = (obj: T) => new this.service(obj).save();

    public Find = (predicate: ((obj: T) => boolean)) => this.service.$where(predicate);

    public FindOne = (query: any) => this.service.findOne(query);

    public Update = (obj, propName, update ) => this.service.findOneAndUpdate({ [propName]: obj }, update);

    public Get = (obj, propName) => this.GetQuery(obj, propName).then((u) => u);
    public GetQuery = (obj, propName) => this.service.findOne({ [propName]: obj});
    public GetAndPopulate(obj, propName, path: string) {
        return this.GetQuery(obj, propName).populate(this.BuildPopulation(path)).exec();
    }

    public BuildPopulation(path: string) {
        let populationParams = null;
        path.split('.').reverse().forEach((p) => {
            if (populationParams == null) {
                populationParams = { path: p };
            } else {
                populationParams = {
                    path: p,
                    populate: populationParams,
                };
            }
        });
        return populationParams;
    }

    public Delete = (value, propName) => this.service.deleteOne({ [propName]: value }).then((u) => u);
    public GetAll = () => this.service.find();

}
