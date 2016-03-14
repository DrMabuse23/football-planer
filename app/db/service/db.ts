/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
import {App, IonicApp, IonicPlatform} from 'ionic-angular';
import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
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
      return this.http.get('build/config.json')
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

  onAuthCallback(authData) {
    if (authData) {
      // console.log("Authenticated with uid:", authData);
    } else {
      // console.log("Client unauthenticated.")
    }
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
        //debugger;
        self.dbAuthChange.subscribe(self.dbAuth);
        return resolve(data);
      });
    });
  }

  getDb(){
    return this.db;
  }

  unauth() {
    return this.db.unauth();
  }
  authWithPassword(email, password) {
    // console.log('(email, password', email, password);
    let self = this;
    //CryptoJS.HmacSHA256(password, this.cfg.token).toString()
    return new Promise((resolve, reject) => {

      return this.db.authWithPassword({
        "email": email,
        "password": password
      }, function(error, authData) {
        self.db.onAuth(self.onAuthCallback);
        self.db.offAuth(self.onAuthCallback);
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