
import {App, IonicApp, Config, Platform, IONIC_DIRECTIVES***REMOVED*** from 'ionic-angular';
import {NgClass***REMOVED*** from 'angular2/common';
***REMOVED***

import {LoginPage***REMOVED*** from './auth/page/login';
import {DBService***REMOVED*** from './db/service/db';
import {UserService***REMOVED*** from './db/service/user';
import {PlaceService***REMOVED*** from './db/service/place';

@App({
  templateUrl: 'build/main/main.html',
  config: {
    platforms: {
      android: {
        navbarStyle: 'primary',
        tabbarStyle: 'primary'
    ***REMOVED***
  ***REMOVED***,
    backButtonText: '',
    locale: 'de'
***REMOVED***,
  directives: [IONIC_DIRECTIVES],
  providers:[DBService, UserService, PlaceService]
***REMOVED***)
class FootBallPlanerApp {
  dbAuthChanged: Observable = new Observable(
  (dbAuth:boolean) => { this.authChange(dbAuth); ***REMOVED***,
  (error) => { ***REMOVED***,
  () => { ***REMOVED***);

  constructor(app: IonicApp, config: Config, platform: Platform, dbService: DBService) {
    this.dbService = dbService;
    this.setDb(dbService);
    this.app = app;
    this.isTablet = window.screen.width < 600 ? false : true;// platform.platforms().indexOf('tablet') != - 1;
    config.set('isTablet', this.isTablet);
    this.isMD = config.get('mode') == 'md' ? '' : null;
    this.pages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' ***REMOVED***
    ];
    this.root = LoginPage;
***REMOVED***

  setDb(dbService: DBService){
    this.dbService.dbAuthChange.subscribe(this.dbAuthChanged);
    this.dbService.getConfig().then((res) =>{
      this.dbService.auth();
  ***REMOVED***).catch(err => console.error(err));
    this.dbServiceIsLoggedIn = this.dbService.dbAuth;
***REMOVED***

  authChange (dbAuth:any) {
    this.dbServiceIsLoggedIn = this.dbService.dbAuth;
***REMOVED***
***REMOVED***
