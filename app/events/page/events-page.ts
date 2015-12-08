import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf, NgFor***REMOVED*** from 'angular2/angular2';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
import {Observer***REMOVED*** from 'rx.all';
import {DBService***REMOVED*** from './../../db/service/db';
import {EventsService***REMOVED*** from './../services/events';

@Page({
  templateUrl: 'events/templates/events.html',
  providers: [EventsService]
***REMOVED***)
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
  ***REMOVED***,
  (error) => { console.error(error) ***REMOVED***,
  () => { ***REMOVED***);

  constructor(app: IonicApp, nav: NavController, dbService: DBService, eventService: EventsService) {
    this.app = app;
    this.eventService = eventService;
    this.getData();
***REMOVED***

  getData() {
    this.eventService.eventsChanged.subscribe(this.eventsChange.bind(this));
    this.eventService.getEvents();
***REMOVED***

  eventsChange(eventsChanged: boolean) {

    if (eventsChanged) {
      this.events = this.eventService.events;
  ***REMOVED***
    console.log('whooza', this);
***REMOVED***

  import() {
    this.eventService.setYear();
***REMOVED***
***REMOVED***