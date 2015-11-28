/**
 * Created by drmabuse on 04/10/15.
 */
'use strict';
require("babel/polyfill");
var cfg = require('./../config.json');

import Firebase from 'firebase';
export default class DB {
  constructor(url = undefined, token = undefined) {
    this.server = cfg.api;
    this.token = cfg.token;
    this.db = new Firebase(this.server);
***REMOVED***

  auth() {
    console.log('enter auth')
    return new Promise((resolve, reject) => {
      return this.db.authWithCustomToken(cfg.token, function (err, data) {
        if (err) {
          console.error(err);
          return reject(err);
      ***REMOVED***
        console.log('enter auth success ');
        return resolve(data);

    ***REMOVED***);
  ***REMOVED***);
***REMOVED***
  authWithPassword(email, password) {
    console.log('(email, password', email, password);
    return new Promise((resolve, reject) => {
      return this.db.authWithPassword({
        "email": email,
        "password": password
    ***REMOVED***, function (error, authData) {
  ***REMOVED***
          console.error(error);
          return reject(error);
      ***REMOVED*** else {
          console.log("Authenticated successfully with payload:", authData);
          return resolve(authData);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***
***REMOVED***