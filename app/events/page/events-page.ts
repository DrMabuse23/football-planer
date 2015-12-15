import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf, NgFor} from 'angular2/common';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {Observable} from 'rxjs/Observable';
import {findIndex} from 'lodash';
import {DBService} from './../../db/service/db';
import {UserService} from '../../db/service/user';
import {EventsService} from './../services/events';

@Page({
  templateUrl: 'events/templates/events.html',
  providers: [EventsService]
})
export class EventsPage {
  app: IonicApp;
  pages: any;
  root: any;
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

  constructor(app: IonicApp, nav: NavController, dbService: DBService, eventService: EventsService, userService: UserService) {
    this.app = app;
    this.eventService = eventService;
    this.userService = userService;
    this.getData();
  }

  getData() {
    this.eventService.eventsChanged.subscribe(this.eventsChange.bind(this));
    this.eventService.getEvents();
    this.eventsLoadedDone = true;
  }

  setPlayer(index) {
    let userUUid = this.userService.userProfile.profile.userUUid;
    if (this.events[index].data.players && this.events[index].data.players.indexOf(userUUid) !== -1) {
      return false;
    }
    let eventref = this.eventService.ref.child(this.events[index].id);
    if (!this.events[index].data.players) {
      this.eventService.updateEvent(this.events[index].id, { players: [userUUid] })
    } else {
      this.events[index].data.players.push(userUUid);
      this.eventService.updateEvent(this.events[index].id, {players: this.events[index].data.players})
    }
  }

  unsetPlayer(index) {
    let userUUid = this.userService.userProfile.profile.userUUid;
    if (this.events[index].data.players && this.events[index].data.players.indexOf(userUUid) !== -1) {
      return false;
    }
    let eventref = this.eventService.ref.child(this.events[index].id);
    if (!this.events[index].data.players) {
      this.eventService.updateEvent(this.events[index].id, { players: [userUUid] })
    } else {
      this.events[index].data.players.push(userUUid);
      this.eventService.updateEvent(this.events[index].id, {players: this.events[index].data.players})
    }
  }

  prepareEvent(event) {
    let userUUid = this.userService.userProfile.profile.userUUid;
    event.hide = event.hide ? event.hide : true;
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
    if ('id' in event && event.id === this) {
      return true;
    }
    return false;
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
      //debugger;
      this[eventsChanged.method](eventsChanged);
    }
    // console.log('whooza', this);
  }

  toggleVisible(index) {
    console.log('toggle', this.events[index], index);
    this.events[index].hide = this.events[index].hide?false: true;
    console.log('toggle', this.events[index], index);
    setTimeout(() => {
      this.events[index].hideCount = this.events[index].hide ? 0 : 1;
    }, 1300);

  }
  import() {
    this.eventService.setYear();
  }
}