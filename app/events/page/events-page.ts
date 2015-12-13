import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf, NgFor} from 'angular2/angular2';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {Observer} from 'rx.all';
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
  eventsLoadedDone: boolean = false;

  eventsLoaded: Observer = Observer.create(
    (eventsChanged: boolean) => {
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
    debugger;
    let userUUid = this.userService.userProfile.profile.userUUid;
    if (this.events[index].data.players && this.events[index].data.players.indexOf(userUUid) !== -1) {
      return false;
    }
    let eventref = this.eventService.ref.child(this.events[index].id);
    if (!this.events[index].data.players) {

      // eventref.set({
      //   players: userUUid
      // });
      this.eventService.updateEvent(this.events[index].id, { players: [userUUid] })
    } else {
      this.events[index].data.players.push(userUUid);
      // eventref.set({
      //   players: this.events[index].data.players
      // });
      this.eventService.updateEvent(this.events[index].id, {players: this.events[index].data.players})
    }
  }

  eventsChange(eventsChanged: boolean) {
    if (eventsChanged) {
      this.events = this.eventService.events;
      this.events.forEach((event, index) => {
        this.events[index].hide = true;
        this.events[index].hideCount = 0;
      });
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