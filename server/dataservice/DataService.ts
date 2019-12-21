const mongoose = require('mongoose');
import { User } from '../models/user';
import { ModelService } from './ModelService';
import { Profile } from '../models/profile';
const config = require('../config/AuthConfig.json');
(mongoose as any).Promise = global.Promise;

mongoose.connect('mongodb://' + config.Database.User + ':' + config.Database.Password +
  '@' + config.Database.Host + ':' + config.Database.Port + '/' +
  config.Database.Database, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true });

const userService = new ModelService<User>(User, mongoose);
const profileService = new ModelService<Profile>(Profile, mongoose);
export class DataService {

  public static get UserService() {
    return userService;
  }
  public static get ProfileService() {
    return profileService;
  }

}


