window.CryptoJS = require('browserify-cryptojs');
require('browserify-cryptojs/components/x64-core');
require('browserify-cryptojs/components/sha256');
require('browserify-cryptojs/components/hmac');
import {App, IonicApp, Config, Platform} from 'ionic/ionic';
import {NgClass} from 'angular2/common';
import {Observable} from 'rxjs/Observable';
import {LoginPage} from './../auth/page/login';
import {DBService} from './../db/service/db';
import {UserService} from './../db/service/user';
import {PlaceService} from './../db/service/place';
import './main.scss'
import {enableProdMode} from 'angular2/core'; enableProdMode();
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
    locale: 'de'
  },
  providers:[DBService, UserService, PlaceService]
})

class App {
  dbAuthChanged: Observable = new Observable(
  (dbAuth:boolean) => { this.authChange(dbAuth); },
  (error) => { },
  () => { });

  constructor(app: IonicApp, config: Config, platform: Platform, dbService: DBService) {
    this.dbService = dbService;
    this.setDb(dbService);
    this.app = app;
    this.isTablet = platform.platforms().indexOf('tablet') != - 1;
    config.set('isTablet', this.isTablet);
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
    this.dbServiceIsLoggedIn = this.dbService.dbAuth;
  }
}
