/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
import {App, IonicApp, IonicPlatform***REMOVED*** from 'ionic-angular';
***REMOVED***
import {Http, HTTP_PROVIDERS***REMOVED*** from 'angular2/http';
***REMOVED***
let Firebase = require('firebase');

interface DBInterface {
  db: any;
  token: string;
  uri: string;
  unauth(): any;
  authWithPassword(email: string, password: string): any;
***REMOVED***

***REMOVED***
class DBService implements DBInterface {
  private _app: IonicApp;
  private _http: Http;
  private _cfg: any = null;
  private _token: string;
  private _uri: string;
***REMOVED***

  public dbAuth: boolean = false
  public dbAuthChange: any = new EventEmitter();
  public loggedInUser: any = null;

  constructor(app: IonicApp, http: Http) {
    this._app = app;
    this._http = http;
***REMOVED***

  private _getConfig() {
    return new Promise((resolve, reject) => {
      return this._http.get('build/config.json')
        .map(res => res.json())
        .subscribe(
          (data) => {
            this._token = data.token;
            this._uri = data.api;
            this._db = new Firebase(this.uri);
        ***REMOVED***,
          err => { return reject(err) ***REMOVED***,
          () => { return resolve(this.token) ***REMOVED***
        );
  ***REMOVED***);
***REMOVED***

  public onAuthCallback(authData) {
***REMOVED***
***REMOVED***
  ***REMOVED*** else {
***REMOVED***
  ***REMOVED***
***REMOVED***

  private _authWithCustomToken() {
    let self = this;
    return new Promise((resolve, reject) => {
      return this.db.authWithCustomToken(this.token, function(err, data) {
        if (err) {
          console.error(err);
          return reject(err);
      ***REMOVED***
        self.dbAuth = true;
        //debugger;
        self.dbAuthChange.subscribe(self.dbAuth);
        return resolve(data);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

  public auth() {
    if (!this.token || !this.uri) {
      return this._getConfig().then(() => {
        return this._authWithCustomToken();
    ***REMOVED***);
  ***REMOVED***
***REMOVED***

  public getDb() {
    return this.db;
***REMOVED***

  public unauth() {
    return this.db.unauth();
***REMOVED***
  /**
   * deprecated
   */
  public authWithPassword(email, password) {
    // console.log('(email, password', email, password);
    let self = this;
    //CryptoJS.HmacSHA256(password, this.cfg.token).toString()
    return new Promise((resolve, reject) => {

      return this.db.authWithPassword({
        "email": email,
        "password": password
    ***REMOVED***, function(error, authData) {
        self.db.onAuth(self.onAuthCallback);
        self.db.offAuth(self.onAuthCallback);
  ***REMOVED***
          console.error(error);
          return reject(error);
      ***REMOVED*** else {
          self.loggedInUser = authData;
          return resolve(authData);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

  public get token(): string {
    return this._token;
***REMOVED***

  public get uri(): string {
    return this._uri;
***REMOVED***

***REMOVED***
***REMOVED***
***REMOVED***

***REMOVED***
module DBService { ***REMOVED***;
export {DBService as DBServiceTemp***REMOVED***;
