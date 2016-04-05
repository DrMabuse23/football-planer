/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
import {App, IonicApp, IonicPlatform} from 'ionic-angular';
import {Injectable, EventEmitter} from 'angular2/core';
import {Http, HTTP_PROVIDERS} from 'angular2/http';
import 'rxjs/add/operator/map';
let Firebase = require('firebase');

interface DBInterface {
  db: any;
  token: string;
  uri: string;
  unauth(): any;
}

@Injectable()
class DBService implements DBInterface {
  private _app: IonicApp;
  private _http: Http;
  private _cfg: any = null;
  private _token: string;
  private _uri: string;
  private _db: any;

  public dbAuth: boolean = false
  public dbAuthChange: any = new EventEmitter();

  constructor(app: IonicApp, http: Http) {
    this._app = app;
    this._http = http;
  }

  private _getConfig() {
    return new Promise((resolve, reject) => {
      return this._http.get('build/config.json')
        .map(res => res.json())
        .subscribe(
          (data) => {
            this._token = data.token;
            this._uri = data.api;
            this._db = new Firebase(this.uri);
          },
          err => { return reject(err) },
          () => { return resolve(this.token) } //finally
        );
    });
  }

  public onAuthCallback(authData) {
    if (authData) {
      // console.log("Authenticated with uid:", authData);
    } else {
      // console.log("Client unauthenticated.")
    }
  }

  private _authWithCustomToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      return this.db.authWithCustomToken(this.token, function(err, data) {
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

  public auth() {
    if (!this.token || !this.uri) {
      return this._getConfig().then(() => {
        return this._authWithCustomToken();
      });
    }
  }

  public getDb() {
    return this.db;
  }

  public unauth() {
    return this.db.unauth();
  }

  public get token(): string {
    return this._token;
  }

  public get uri(): string {
    return this._uri;
  }

  public get db(): any {
    return this._db;
  }

}
module DBService { };
export {DBService as DBServiceTemp};
