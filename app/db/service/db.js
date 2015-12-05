/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
import {App, IonicApp, IonicPlatform***REMOVED*** from 'ionic/ionic';
import {Injectable, bind, EventEmitter***REMOVED*** from 'angular2/angular2';
import {Http***REMOVED*** from 'angular2/http';
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
      return this.http.get('config.json')
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
        self.dbAuthChange.next(self.dbAuth);
        console.log('enter auth success ', data);
        return resolve(data);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***
  
  getDb(){
    return this.db;
***REMOVED***
  
  authWithPassword(email, password) {
    console.log('(email, password', email, password);
    var self = this;
    return new Promise((resolve, reject) => {
      return this.db.authWithPassword({
        "email": email,
        "password": CryptoJS.HmacSHA256(password, this.cfg.token).toString()
    ***REMOVED***, function (error, authData) {
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