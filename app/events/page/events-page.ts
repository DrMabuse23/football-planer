import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf***REMOVED*** from 'angular2/angular2';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
import {DBService***REMOVED*** from './../../db/service/db';
import {UserService***REMOVED*** from '../../db/service/user';

@Page({
  templateUrl: 'events/templates/events.html'
***REMOVED***)
export class EventsPage {
  app: IonicApp;
  pages: any;
  root: any;
  dbService: DBService;
  UserService: UserService;
  constructor(app: IonicApp, nav: NavController, dbService: DBService, userService: UserService) {
    this.app = app;
***REMOVED***
***REMOVED***