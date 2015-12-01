import {App, IonicApp, Config***REMOVED*** from 'ionic/ionic';
import {LoginPage***REMOVED*** from './../auth/page/login';
import {DBService***REMOVED*** from './../db/service/db';
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
  providers: [DBService]
***REMOVED***)
class App {
  constructor(app: IonicApp, config: Config, dbService:DBService) {
    this.app = app;
    // retrieve the conference data
    console.log('app', app, config);
    
    this.dbService = dbService;
    this.isMD = config.get('mode') == 'md' ? '' : null;
    this.pages = [
      { title: 'Login', component: LoginPage, icon: 'log-in', db: this.dbService ***REMOVED***
    ];
    this.root = LoginPage;
    this.dbService.getConfig().then((res) =>{
      this.dbService.auth();
  ***REMOVED***).catch(err => console.error(err));
***REMOVED***
  
***REMOVED***
