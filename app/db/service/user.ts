import {Injectable***REMOVED*** from 'angular2/angular2';
import {DBService***REMOVED*** from './../../db/service/db';

***REMOVED***
export class UserService {
  user: any = {
    email: null,
    password: null
***REMOVED***;
  profile: any = {
    firstName: null,
    lastName: null,
    mobile: null,
    createdAt: null,
    updatedAt: null,
    userUUid: null
***REMOVED***;
  userProfile: any;
  dbService: DBService;

  constructor(dbService: DBService) {
    this.dbService = dbService;
***REMOVED***

  mapUser(form) {
    console.log(form);
    this.user.email = form.value.email;
    this.user.password = CryptoJS.HmacSHA256(form.value.matchingPassword.password, this.dbService.cfg.token).toString();
    this.profile.firstName = form.value.firstName;
    this.profile.lastName = form.value.lastName;
    this.profile.mobile = form.value.mobile;
    this.profile.createdAt = this.profile.updatedAt = new Date().getTime();
***REMOVED***
  registerUser(form) {
    this.mapUser(form);
    console.log(this.user, this.profile, CryptoJS);
    return this.createUser();
***REMOVED***

  createUser() {
    var self = this;
    return new Promise((resolve, reject) => {
      this.dbService.db.createUser({
        email: this.user.email,
        password: this.user.password
    ***REMOVED***, function(error, userData) {
  ***REMOVED***
          return reject(error);
      ***REMOVED*** else {

          console.log("Successfully created user account with uid:", userData);
          return self.createProfile(userData.uid, self);
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***);
***REMOVED***

  createProfile(uuid, self) {
    self.profile.userUUid = uuid;
    let profileRef = self.dbService.db.child("playerProfiles");
    return new Promise((resolve, reject) => {
      profileRef.push(self.profile, (err, profile) => {
        if (err) {
          return reject(err);
      ***REMOVED***
        return resolve(true);
    ***REMOVED***);
  ***REMOVED***);
***REMOVED***

  getUserProfile() {
    let authData = this.dbService.db.getAuth();
    let self = this;
***REMOVED***
      let profileRef = this.dbService.db.child("playerProfiles");
      return new Promise((resolve, reject) => {
        return profileRef.orderByChild("userUUid").equalTo(authData.uid).on("value", (snapshot) => {
          if (typeof snapshot === 'object') {
            snapshot.forEach((data) => {
              self.userProfile = {
                authData: authData,
                profile: data.val()
            ***REMOVED***
          ***REMOVED***);
            return resolve(self.userProfile);
        ***REMOVED***
      ***REMOVED***, (err) => {
          console.error(err);
          return reject(err);
      ***REMOVED***);
    ***REMOVED***)
  ***REMOVED***
***REMOVED***
***REMOVED***