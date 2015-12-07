window.CryptoJS = require('browserify-cryptojs');
require('browserify-cryptojs/components/x64-core');
require('browserify-cryptojs/components/sha256');
require('browserify-cryptojs/components/hmac');
import {App, IonicApp, Config***REMOVED*** from 'ionic/ionic';
import {NgClass***REMOVED*** from 'angular2/angular2';
import {Observer***REMOVED*** from 'rx.all';
import {LoginPage***REMOVED*** from './../auth/page/login';
import {DBService***REMOVED*** from './../db/service/db';
import {UserService***REMOVED*** from './../db/service/user';
import {PlaceService***REMOVED*** from './../db/service/place';
import './main.scss';

@App({
  templateUrl: 'main/main.html',
  config: {
    platforms: {
      android: {
        navbarStyle: 'primary',
        tabbarStyle: 'primary'
    ***REMOVED***
  ***REMOVED***,
    backButtonText: '',
***REMOVED***,
  providers:[DBService, UserService, PlaceService]
***REMOVED***)

class App {
  dbAuthChanged: Observer = Observer.create(
  (dbAuth:boolean) => { this.authChange(dbAuth); ***REMOVED***,
  (error) => { ***REMOVED***,
  () => { ***REMOVED***);
  constructor(app: IonicApp, config: Config, dbService: DBService) {
    this.dbService = dbService;
    this.setDb(dbService);
    this.app = app;
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
