import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf***REMOVED*** from 'angular2/angular2';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
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

  constructor(app: IonicApp, nav: NavController, dbService: DBService, eventService: EventsService) {
    this.app = app;
    this.eventService = eventService;
    this.eventService.getEvents();
***REMOVED***
***REMOVED***