import {Injectable, bind, EventEmitter***REMOVED*** from 'angular2/core';
import {Config***REMOVED*** from 'ionic-angular';
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
  inProgress: boolean = false;
  constructor(config: Config, dbService: DBService, placeService: PlaceService) {
    this.dbService = dbService;
    this.placeService = placeService;
    this.eventsChanged = new EventEmitter();
    this.ref = this.dbService.db.child("events");
    this.inProgress = false;
    this.hasChangeEvent = false;
    moment.locale(config.get('locale'));
***REMOVED***
  findById(item) {
    return 'id' in item && item.id === this.toString();
***REMOVED***
  isPlayed (playedTime) {
    let now = new Date().getTime();
    if (now > playedTime) {
      return false;
  ***REMOVED***
    return true;
***REMOVED***

  prepareEvent(event) {
    // debugger;
    event.place = this.placeService.getPlaceById(event.data.place);
    event.date = moment(event.data.playDate).format('LLL');
    event.comments = [];
    return event;
***REMOVED***

  prepareEvents() {
    let self = this;
    self.events.forEach((event, i) => {
      this.events[i] = self.prepareEvent(event);
  ***REMOVED***);
    self.eventsChanged.next(true);
***REMOVED***

  getEvents() {
    let self = this;
    this.placeService.getPlaces();
    if (!this.inProgress) {
      self.events = [];
      this.inProgress = true;
      this.ref.orderByChild('playDate').once('value', (snapshot) => {
        //debugger;
        if (typeof snapshot === 'object') {
          let i = 0;
          snapshot.forEach((data) => {
            let model = {
              data: data.val(),
              id: data.key()
          ***REMOVED***;
            if (self.isPlayed(model.data.playDate)) {
              self.events.push(model);
              i++;
          ***REMOVED*** else {
              self.updateEvent(model.id, { 'played': true ***REMOVED***);
          ***REMOVED***
        ***REMOVED***);
          self.childChanged();
          self.prepareEvents();
          self.inProgress = false;
      ***REMOVED***
    ***REMOVED***, (err) => console.error(err));
  ***REMOVED***
***REMOVED***

  togglePlayer(id:string, playerUuid:string) {
    let event = this.events.filter(this.findById, id)[0];
    let players = event.data.players;
    if (!players) {
      this.updateEvent(event.id, { players: [playerUuid] ***REMOVED***)
  ***REMOVED*** else {
      let index = players.indexOf(playerUuid);
      if (index !== -1) {
        players.splice(index, 1);
        this.updateEvent(event.id, { players: players ***REMOVED***);
    ***REMOVED*** else {
        players.push(playerUuid);
        this.updateEvent(event.id, { players: players ***REMOVED***)
    ***REMOVED***
  ***REMOVED***
***REMOVED***

  childChanged() {
    let self = this;
    this.ref.on("child_changed",(snapshot) => {
      //debugger;
      self.eventsChanged.next(self.prepareEvent({
        method: 'changed',
        data: snapshot.val(),
        id: snapshot.key()
    ***REMOVED***));
  ***REMOVED***);
    this.ref.on("child_added", function(snapshot) {

  ***REMOVED***);
    this.ref.on("child_removed", function(snapshot) {

  ***REMOVED***);
***REMOVED***
  updateEvent(id, attr) {
    let eventRef = this.ref.child(id);
    // debugger;
    return eventRef.update(attr);
***REMOVED***;

  setYear(year = 2016, place = '-K-m_vkLkNXg5P-RRmx5') {
    let self = this;
    let d = new Date(2015, 11, 13, 14, 30);
    let oneWeek = 7*24*60*60*1000;
    let time = d.getTime();
    this.ref.set([]);
    for(let i = 0, l=100; i < l; i++){

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
    ***REMOVED***
  ***REMOVED***
***REMOVED***
***REMOVED***