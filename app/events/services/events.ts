import {Injectable, bind, EventEmitter***REMOVED*** from 'angular2/angular2';
import {Config***REMOVED*** from 'ionic/ionic';
import {DBService***REMOVED*** from './../../db/service/db';
import {PlaceService***REMOVED*** from './../../db/service/place';
import * as moment from 'moment';
***REMOVED***
export class EventsService {
  dbService: DBService;
  placeService: PlaceService;
  events: array = [];
  ref: any;
  eventsChanged: EventEmitter;

  constructor(config: Config, dbService: DBService, placeService: PlaceService) {
    this.dbService = dbService;
    this.placeService = placeService;
    this.eventsChanged = new EventEmitter();
    this.ref = this.dbService.db.child("events");
    moment.locale(config.get('locale'));
***REMOVED***

  getEvents() {
    let self = this;
    this.placeService.getPlaces();
    //debugger;

    this.ref.orderByChild('playDate').on('value', (snapshot) => {
      if (typeof snapshot === 'object') {
        let i = 0;
        snapshot.forEach((data) => {
          console.log(i);
          self.events.push({
            data: data.val(),
            id: data.key()
        ***REMOVED***);
          self.events[i].place = self.placeService.getPlaceById(self.events[i].data.place);
          //1450017000000
          self.events[i].date = moment(self.events[i].data.playDate).format('LLL');
          self.events[i].comments = [];
          i++;
      ***REMOVED***);
        console.log('self.events', self.events);

        self.eventsChanged.next(true);
    ***REMOVED***
  ***REMOVED***, (err) => console.error(err));
***REMOVED***

  setYear(year = 2016, place = '-K-m_vkLkNXg5P-RRmx5') {
    var self = this;
    var d = new Date(2015, 11, 13, 15, 30);
    var oneWeek = 7*24*60*60*1000;
    var time = d.getTime();
    this.ref.set([]);
    for(var i = 0, l=100; i < l; i++){

      var next = new Date();
      next.setTime(time);

      if (next.getFullYear() <= year) {
        this.ref.push({
          name: 'Spiel',
          playDate: time,
          place: place,
          players: false,
          played: false
      ***REMOVED***, (err) => {
          //debugger;
          if (err) {
            console.log("Data could not be saved." + err);
        ***REMOVED*** else {
            console.log("Data saved successfully.");
        ***REMOVED***
        ***REMOVED***);
          time = time + oneWeek;
        // console.log(i);
        //console.log('time', time);
        //console.log('d.getDay()', next.getDay());
        //console.log(i10n.DAY[next.getDay()]);
        //console.log('d.getMonth()', next.getMonth());
        //console.log('getYear', next.getFullYear());
        //console.log(next);
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***