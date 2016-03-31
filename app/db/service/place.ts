import {Injectable***REMOVED*** from 'angular2/core';
import {NgFirebase***REMOVED*** from './../../modules/ngfb/ng-firebase';

***REMOVED***
export class PlaceService {
  dbService: NgFirebase.DBService;
  places: Object = {***REMOVED***;

  constructor(dbService: NgFirebase.DBService) {
    this.dbService = dbService;
***REMOVED***

  getPlaceById(uuid) {
    return this.places[uuid];
***REMOVED***

  getPlaces() {
    let self = this;
    let ref = this.dbService.db.child("places");
    return new Promise((resolve, reject) => {
      return ref.once("value", (snapshot) => {
        // console.log('get Places', snapshot);
        if (typeof snapshot === 'object') {
          // console.log('get Places is object', snapshot);
          snapshot.forEach((data) => {
            // console.log('get Place', data);
            self.places[data.key()] = data.val();
        ***REMOVED***);
          // console.log(self.places);
          return resolve(self.places);
      ***REMOVED***
    ***REMOVED***, (err) => {
        console.error(err);
        return reject(err);
    ***REMOVED***);
  ***REMOVED***)
***REMOVED***
***REMOVED***
