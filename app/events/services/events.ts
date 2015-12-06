import {Injectable} from 'angular2/angular2';
import {DBService} from './../../db/service/db';

@Injectable()
export class EventsService {
  dbService: DBService;
  events: any;
  ref: any;

  constructor(dbService: DBService) {
    this.dbService = dbService;
    this.events = null;
    this.ref = this.dbService.db.child("events");
  }

  getEvents() {
    this.ref.orderByChild('timestamp').on('value', (snapshot) => {
      if (typeof snapshot === 'object') {
        snapshot.forEach((data) => {
          console.log(data.val());
        });
      }
    }, (err) => console.error(err));
  }
}