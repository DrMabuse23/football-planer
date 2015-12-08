import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf, NgFor} from 'angular2/angular2';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {Observer} from 'rx.all';
import {DBService} from './../../db/service/db';
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
  eventService: EventsService
  events: any = null;

  eventsLoaded: Observer = Observer.create(
    (eventsChanged: boolean) => {
      console.log('Hey events', eventsChanged);
      this.eventsChange(eventsChanged);
    },
  (error) => { console.error(error) },
  () => { });

  constructor(app: IonicApp, nav: NavController, dbService: DBService, eventService: EventsService) {
    this.app = app;
    this.eventService = eventService;
    this.getData();
  }

  getData() {
    this.eventService.eventsChanged.subscribe(this.eventsChange.bind(this));
    this.eventService.getEvents();
  }

  eventsChange(eventsChanged: boolean) {

    if (eventsChanged) {
      this.events = this.eventService.events;
    }
    console.log('whooza', this);
  }

  import() {
    this.eventService.setYear();
  }
}