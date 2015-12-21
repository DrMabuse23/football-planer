/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
import {App, IonicApp, IonicPlatform***REMOVED*** from 'ionic/ionic';
***REMOVED***
import {Http, HTTP_PROVIDERS***REMOVED*** from 'angular2/http';
***REMOVED***
var Firebase = require('firebase');

***REMOVED***
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
***REMOVED***

  getConfig() {
    return new Promise((resolve, reject) => {
      return this.http.get('./config.json')
        .map(res => res.json())
        .subscribe(
          (data) => {
            this.cfg = data;
            this.db = new Firebase(this.cfg.api);
        ***REMOVED***,
          err => { return reject(err) ***REMOVED***,
          () => {return resolve(this.cfg)***REMOVED***
        );
  ***REMOVED***);
***REMOVED***

  onAuthCallback(authData) {
***REMOVED***
      console.log("Authenticated with uid:", authData);
  ***REMOVED*** else {
      console.log("Client unauthenticated.")
  ***REMOVED***
***REMOVED***

  auth() {
    if (!this.cfg) {
      return new Promise((resolve, reject) => {
        return reject('No Config', this.cfg);
    ***REMOVED***);
  ***REMOVED***
    let self = this;
    return new Promise((resolve, reject) => {
      return this.db.authWithCustomToken(this.cfg.token, function (err, data) {
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

  getDb(){
    return this.db;
***REMOVED***

  unauth() {
    return this.db.unauth();
***REMOVED***
  authWithPassword(email, password) {
    console.log('(email, password', email, password);
    var self = this;
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

***REMOVED***