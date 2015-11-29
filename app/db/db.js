/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
import {App, IonicApp, IonicPlatform} from 'ionic/ionic';
import {Injectable, bind} from 'angular2/angular2';
import {Http} from 'angular2/http';
var Firebase = require('firebase');

@Injectable()
export class DBService {
  constructor(app: IonicApp, http: Http) {
    this.app = app;
    this.http = http;
    this.cfg = null;
    this.db = null;
    this.dbAuth = false;
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
    return new Promise((resolve, reject) => {
      return this.db.authWithPassword({
        "email": email,
        "password": password
      }, function (error, authData) {
        if (error) {
          console.error(error);
          return reject(error);
        } else {
          console.log("Authenticated successfully with payload:", authData);
          return resolve(authData);
        }
      });
    });
  }
}