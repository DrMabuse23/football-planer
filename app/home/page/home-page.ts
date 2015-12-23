import {NgFor***REMOVED*** from 'angular2/core';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
import {UserService***REMOVED*** from '../../db/service/user';
import {DBService***REMOVED*** from '../../db/service/db';
import {LoginPage***REMOVED*** from './../../auth/page/login';
import {EventsPage***REMOVED*** from '../../events/page/events-page';
@Page({
  templateUrl: 'home/templates/index.html'
***REMOVED***)
export class HomePage {
  app: IonicApp;
  pages: any;
  root: any;
  userService: UserService;
  dbService: DBService;
  loginPage: any;
  constructor(app: IonicApp, nav: NavController, userService: UserService, dbService:DBService) {
    this.app = app;
    this.root = EventsPage;
    this.dbService = dbService;
    this.loginPage = LoginPage;
    this.nav = this.app.getComponent('nav');
    this.pages = [
      { title: 'Events', component: EventsPage, icon: 'calendar' ***REMOVED***,
    ];
    this.userService = userService;
***REMOVED***

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component === this.root) {
      return this.app.getComponent('leftMenu').close();
  ***REMOVED***

    this.nav.setRoot(page.component).then(() => {
      // wait for the root page to be completely loaded
      // then close the menu
      this.app.getComponent('leftMenu').close();
  ***REMOVED***);
***REMOVED***

  logout() {
    this.dbService.unauth();
    this.app.getComponent('leftMenu').close();
    this.nav.setRoot(this.loginPage);
***REMOVED***
***REMOVED***