const mongoose = require('mongoose');
import { User } from '../models/user';
import { ModelService } from './ModelService';
import { Profile } from '../models/profile';
import { mongo } from 'mongoose';
import { Character } from '../models/character';
const config = require('../config/AuthConfig.json');
(mongoose as any).Promise = global.Promise;

let connection = 'mongodb://';
let connectionPath = config.Database.Host;
if(config.Database.IsSRV) {
  let pos = connection.indexOf(':');
  connection = [connection.slice(0, pos), '+srv', connection.slice(pos)].join('');
}
else {
  connectionPath += config.Database.Port;
}

mongoose.connect(connection + config.Database.User + ':' + config.Database.Password + '@' + connectionPath + '/' +
  config.Database.Database, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false });

const userService = new ModelService<User>(User, mongoose);
const profileService = new ModelService<Profile>(Profile, mongoose);
const characterService = new ModelService<Character>(Character, mongoose)
export class DataService {

  public static get CharacterService(){
    return characterService;
  }

  public static get UserService() {
    return userService;
  }
  public static get ProfileService() {
    return profileService;
  }

}


