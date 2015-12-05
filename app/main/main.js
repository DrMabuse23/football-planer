window.CryptoJS = require('browserify-cryptojs');
require('browserify-cryptojs/components/x64-core');
require('browserify-cryptojs/components/sha256');
require('browserify-cryptojs/components/hmac');
import {App, IonicApp, Config} from 'ionic/ionic';
import {NgClass} from 'angular2/angular2';
import {Observer} from 'rx.all';
import {LoginPage} from './../auth/page/login';
import {DBService} from './../db/service/db';

import './main.scss';

@App({
  templateUrl: 'main/main.html',
  config: {
    platforms: {
      android: {
        navbarStyle: 'primary',
        tabbarStyle: 'primary'
      }
    },
    backButtonText: '',
  },
  providers:[DBService]
})

class App {
  dbAuthChanged: Observer = Observer.create(
  (dbAuth:boolean) => { console.log('dbAuth', dbAuth);this.authChange(dbAuth); },
  (error) => { },
  () => { });
  constructor(app: IonicApp, config: Config, dbService: DBService) {
    this.dbService = dbService;
    this.setDb(dbService);
    this.app = app;
    // retrieve the firebase db
    console.log('app', app, config);
    this.isMD = config.get('mode') == 'md' ? '' : null;
    this.pages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' }
    ];
    this.root = LoginPage;
  }
  
  setDb(dbService: DBService){
    this.dbService.dbAuthChange.subscribe(this.dbAuthChanged);
    this.dbService.getConfig().then((res) =>{
      this.dbService.auth();
    }).catch(err => console.error(err));
    this.dbServiceIsLoggedIn = this.dbService.dbAuth;
  }
  
  authChange (dbAuth:any) {
    console.log('subscribe dbAuth', dbAuth);
    this.dbServiceIsLoggedIn = this.dbService.dbAuth;
  }
  
}
