import {NgClass, Disabled, NgIf, NgFor} from 'angular2/common';
import {Page, NavParams} from 'ionic/ionic';
import {Observable} from 'rxjs/Observable';
import {findIndex} from 'lodash';
import {UserService} from '../../db/service/user';
import {EventsService} from './../services/events';

@Page({
  templateUrl: 'events/templates/event.html',
  providers: [EventsService]
})
export class EventPage {
  app: IonicApp;
  pages: any;
  root: any;
  config: Config;
  dbService: DBService;
  userService: UserService;
  eventService: EventsService
  event: any;

  eventsLoaded: Observable = new Observable(
    (eventsChanged: any) => {
      this.eventsChange(eventsChanged);
    },
    (error) => { console.error(error) },
    () => { });

  constructor(navParams: NavParams, eventService: EventsService, userService: UserService) {
    this.params = navParams;
    this.event = this.params.get('event');
    this.players = null;
    userService.getProfilesByIds(this.event.data.players).then((profiles) => {
      this.players = profiles;
    });
    console.log('event', this.event);
  }

  eventsChange(eventsChanged: any) {
    console.log(eventsChanged);
  }
}