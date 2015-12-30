import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf, NgFor} from 'angular2/common';
import {IonicApp, Config, Page, NavController} from 'ionic/ionic';
import {Observable} from 'rxjs/Observable';
import {findIndex} from 'lodash';
import {DBService} from './../../db/service/db';
import {UserService} from '../../db/service/user';
import {EventsService} from './../services/events';
import {EventPage} from './event-page';

@Page({
  templateUrl: 'events/templates/events.html',
  providers: [EventsService]
})
export class EventsPage {
  app: IonicApp;
  pages: any;
  root: any;
  config: Config;
  dbService: DBService;
  userService: UserService;
  eventService: EventsService
  events: any = [];
  eventsLoadedDone: any = false;

  eventsLoaded: Observable = new Observable(
    (eventsChanged: any) => {
      // console.log('Hey events', eventsChanged);
      this.eventsChange(eventsChanged);
    },
  (error) => { console.error(error) },
  () => { });

  constructor(app: IonicApp, config: Config, nav: NavController, dbService: DBService, eventService: EventsService, userService: UserService) {
    this.app = app;
    this.config = config;
    this.eventService = eventService;
    this.userService = userService;
    this.getData();
    this.nav = nav;
  }

  goDetail(event) {
    this.nav.push(EventPage, { event: event });
  }

  getData() {
    this.eventService.eventsChanged.subscribe(this.eventsChange.bind(this));
    this.eventService.getEvents();
    this.eventsLoadedDone = true;
  }

  setPlayer(index) {
    this.eventService.togglePlayer(this.events[index].id, this.userService.userProfile.profile.userUUid);
  }

  prepareEvent(event) {
    let userUUid = this.userService.userProfile.profile.userUUid;
    event.hide = event.hide ? event.hide : !this.config.get('isTablet');
    event.hideCount =  event.hideCount ? event.hideCount : 0;
    if (typeof event.data.players === 'object') {
      event.playerCount = event.data.players.length;
    } else {
      event.playerCount = 0;
    }
    if (event.data.players && event.data.players.indexOf(userUUid) !== -1) {
      event.uuidInPlayers = true;
    } else {
      event.uuidInPlayers = false;
    }
    return event;
  }

  byId(event) {
    return 'id' in event && event.id === this.toString();
  }

  changed(model) {
    let eventsIndex = findIndex(this.events, { id: model.id });
    this.events[eventsIndex] = this.prepareEvent(model);
  }

  eventsChange(eventsChanged: any) {
    let userUUid = this.userService.userProfile.profile.userUUid;
    if (typeof eventsChanged === 'boolean') {
      this.events = this.eventService.events;
      this.events.forEach((event, index) => {
        this.events[index] = this.prepareEvent(event);
      });
    }

    if ( typeof eventsChanged === 'object' && 'method' in eventsChanged) {
      this[eventsChanged.method](eventsChanged);
    }
  }

  toggleVisible(index) {
    this.events[index].hide = this.events[index].hide ? false: true;
    setTimeout(() => {
      this.events[index].hideCount = this.events[index].hide ? 0 : 1;
    }, 1300);
  }

  import() {
    this.eventService.setYear();
  }
}