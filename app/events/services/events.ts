import {Injectable, bind, EventEmitter***REMOVED*** from 'angular2/angular2';
import {DBService***REMOVED*** from './../../db/service/db';
import {PlaceService***REMOVED*** from './../../db/service/place';

***REMOVED***
export class EventsService {
  dbService: DBService;
  placeService: PlaceService;
  events: array = [];
  ref: any;
  eventsChanged: EventEmitter;

  constructor(dbService: DBService, placeService: PlaceService) {
    this.dbService = dbService;
    this.placeService = placeService;
    this.eventsChanged = new EventEmitter();
    this.ref = this.dbService.db.child("events");
***REMOVED***

  getEvents() {
    let self = this;
    this.placeService.getPlaces();

    this.ref.orderByChild('timestamp').on('value', (snapshot) => {
      if (typeof snapshot === 'object') {
        let i = 0;
        snapshot.forEach((data) => {
          console.log(i);
          self.events.push({
            data: data.val(),
            id: data.key()
        ***REMOVED***);
          self.events[i].place = self.placeService.getPlaceById(self.events[i].data.place);
          i++;
      ***REMOVED***);
        console.log('self.events', self.events);

        self.eventsChanged.next(true);
    ***REMOVED***
  ***REMOVED***, (err) => console.error(err));
***REMOVED***
***REMOVED***