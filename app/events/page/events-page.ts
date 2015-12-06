import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf} from 'angular2/angular2';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {DBService} from './../../db/service/db';
import {UserService} from '../../db/service/user';

@Page({
  templateUrl: 'events/templates/events.html'
})
export class EventsPage {
  app: IonicApp;
  pages: any;
  root: any;
  dbService: DBService;
  UserService: UserService;
  constructor(app: IonicApp, nav: NavController, dbService: DBService, userService: UserService) {
    this.app = app;
  }
}