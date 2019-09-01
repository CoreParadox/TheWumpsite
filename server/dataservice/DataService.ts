import * as mongoose from 'mongoose';
import { User } from '@/models/user';
import { ModelService } from './ModelService';
var config = require("../../config/AuthConfig.json");
(mongoose as any).Promise = global.Promise;

mongoose.connect('mongodb://' + config.Database.User + ':' + config.Database.Password +
  "@" + config.Database.Host + ":" + config.Database.Port + "/" + config.Database.Database, { useNewUrlParser: true, useCreateIndex: true });

const userService = new ModelService<User>(User, mongoose);
export class DataService {

  public static get UserService() {
    return userService;
  }

}

