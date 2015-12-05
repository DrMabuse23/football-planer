/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
import {App, IonicApp, IonicPlatform} from 'ionic/ionic';
import {Injectable, bind, EventEmitter} from 'angular2/angular2';
import {Http} from 'angular2/http';
var Firebase = require('firebase');

@Injectable()
export class DBService {
  dbAuth: boolean = false
  dbAuthChange: EventEmitter
  
  constructor(app: IonicApp, http: Http) {
    this.app = app;
    this.http = http;
    this.cfg = null;
    this.db = null;
    this.dbAuthChange = new EventEmitter();
    this.loggedInUser = null;
  }
  
  getConfig() {
    return new Promise((resolve, reject) => {
      return this.http.get('config.json')
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.cfg = data;
            this.db = new Firebase(this.cfg.api);
          },
          err => { return reject(err) },
          () => {return resolve(this.cfg)}
        );
    });
  }

  auth() {
    if (!this.cfg) {
      return new Promise((resolve, reject) => {
        return reject('No Config', this.cfg);
      });
    }
    let self = this;
    return new Promise((resolve, reject) => {
      return this.db.authWithCustomToken(this.cfg.token, function (err, data) {
        if (err) {
          console.error(err);
          return reject(err);
        }
        self.dbAuth = true;
        self.dbAuthChange.next(self.dbAuth);
        console.log('enter auth success ', data);
        return resolve(data);
      });
    });
  }
  
  getDb(){
    return this.db;
  }
  
  authWithPassword(email, password) {
    console.log('(email, password', email, password);
    var self = this;
    return new Promise((resolve, reject) => {
      return this.db.authWithPassword({
        "email": email,
        "password": CryptoJS.HmacSHA256(password, this.cfg.token).toString()
      }, function (error, authData) {
        if (error) {
          console.error(error);
          return reject(error);
        } else {
          self.loggedInUser = authData;
          return resolve(authData);
        }
      });
    });
  }
  
}