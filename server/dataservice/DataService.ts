const mongoose = require('mongoose');
import { User } from '../models/user';
import { ModelService } from './ModelService';
import { Profile } from '../models/profile';
import { mongo } from 'mongoose';
import { Character } from '../models/character';
const config = require('../config/AuthConfig.json');
(mongoose as any).Promise = global.Promise;

mongoose.connect('mongodb://' + config.Database.User + ':' + config.Database.Password +
  '@' + config.Database.Host + ':' + config.Database.Port + '/' +
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


