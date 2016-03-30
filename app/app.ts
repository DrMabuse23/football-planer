import 'es6-shim';
import {App, IonicApp, Config, Platform, IONIC_DIRECTIVES, Page***REMOVED*** from 'ionic-angular';
import {NgClass***REMOVED*** from 'angular2/common';
***REMOVED***

import {LoginPage***REMOVED*** from './auth/page/login';
import {DBService***REMOVED*** from './db/service/db';
import {UserService***REMOVED*** from './db/service/user';
import {PlaceService***REMOVED*** from './db/service/place';

class Route {
  private title: string = '';
  private icon: string = '';
  private params: any = null;
  private component: Page;
  public model: any = new Map();

  constructor(attrs){
    Object.assign(this, attrs);
    Object.keys(attrs).forEach(attr => {
      this.model.set(attr, this[attr]);
  ***REMOVED***);
***REMOVED***

  get attributes(){
    Object.keys(this.model);
***REMOVED***
***REMOVED***

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
  private app: IonicApp;
  private dbService: DBService;
  private isMD: any = null;
  private isTablet:boolean=false;
  private pages: [];
  private root: any;
  private dbServiceIsLoggedIn: boolean = false;

  public dbAuthChanged: Observable = new Observable(
  (dbAuth:boolean) => { this.authChange(dbAuth); ***REMOVED***,
  (error) => { ***REMOVED***,
  () => { ***REMOVED***);

  constructor(app: IonicApp, config: Config, platform: Platform, dbService: DBService) {
    this.dbService = dbService;
    this.setDb();
    this.app = app;

    this.isTablet = window.screen.width < 600 ? false : true;// platform.platforms().indexOf('tablet') != - 1;
    config.set('isTablet', this.isTablet);
    this.isMD = config.get('mode') == 'md' ? '' : null;
    let loginRoute = new Route({
      title: 'Login',
      component: LoginPage,
      icon: 'log-in'
  ***REMOVED***);
    this.pages = [loginRoute.model];
    this.root = LoginPage;
***REMOVED***

  setDb(){
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
