const mongoose = require('mongoose');
import { User } from '../models/user';
import { ModelService } from './ModelService';
import { Profile } from '../models/profile';
import { Character } from '../models/character';
import { Event } from '../models/event';
import { Application } from '../models/application';
import { application } from 'express';
const config = require('../config/AuthConfig.json');
const dbConfig = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
};
(mongoose as any).Promise = global.Promise;

let connection = 'mongodb://';
let connectionPath = config.Database.Host;
if(config.Database.IsSRV) {
  let pos = connection.indexOf(':');
  connection = [connection.slice(0, pos), '+srv', connection.slice(pos)].join('');
} else {
  connectionPath += ':' + config.Database.Port;
}

mongoose.connect(connection + config.Database.User + ':' + config.Database.Password + '@' + connectionPath + '/' + config.Database.Database, dbConfig);

const userService = new ModelService<User>(User, mongoose);
const profileService = new ModelService<Profile>(Profile, mongoose);
const characterService = new ModelService<Character>(Character, mongoose);
const eventService = new ModelService<Event>(Event, mongoose);
const applicationService = new ModelService<Application>(Application, mongoose);
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

  public static get EventService() {
    return eventService;
  }

  public static get ApplicationService(){
    return applicationService;
  }

}


