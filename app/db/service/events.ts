import {Injectable} from 'angular2/angular2';
import {DBService} from './../../db/service/db';

@Injectable()
export class EventService {
  dbService: DBService;
  constructor(dbService: DBService) {
    this.dbService = dbService;
  }
}