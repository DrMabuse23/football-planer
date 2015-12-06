import {Injectable***REMOVED*** from 'angular2/angular2';
import {DBService***REMOVED*** from './../../db/service/db';

***REMOVED***
export class EventsService {
  dbService: DBService;
  events: any;
  ref: any;

  constructor(dbService: DBService) {
    this.dbService = dbService;
    this.events = null;
    this.ref = this.dbService.db.child("events");
***REMOVED***

  getEvents() {
    this.ref.orderByChild('timestamp').on('value', (snapshot) => {
      if (typeof snapshot === 'object') {
        snapshot.forEach((data) => {
          console.log(data.val());
      ***REMOVED***);
    ***REMOVED***
  ***REMOVED***, (err) => console.error(err));
***REMOVED***
***REMOVED***