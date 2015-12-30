import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf, NgFor***REMOVED*** from 'angular2/common';
import {IonicApp, Config, Page, NavController***REMOVED*** from 'ionic/ionic';
***REMOVED***
import {findIndex***REMOVED*** from 'lodash';
import {DBService***REMOVED*** from './../../db/service/db';
import {UserService***REMOVED*** from '../../db/service/user';
import {EventsService***REMOVED*** from './../services/events';
import {EventPage***REMOVED*** from './event-page';

@Page({
  templateUrl: 'events/templates/events.html',
  providers: [EventsService]
***REMOVED***)
export class EventsPage {
  app: IonicApp;
  pages: any;
  root: any;
  config: Config;
  dbService: DBService;
  userService: UserService;
  eventService: EventsService
  events: any = [];
  eventsLoadedDone: any = false;

  eventsLoaded: Observable = new Observable(
    (eventsChanged: any) => {
      // console.log('Hey events', eventsChanged);
      this.eventsChange(eventsChanged);
  ***REMOVED***,
  (error) => { console.error(error) ***REMOVED***,
  () => { ***REMOVED***);

  constructor(app: IonicApp, config: Config, nav: NavController, dbService: DBService, eventService: EventsService, userService: UserService) {
    this.app = app;
    this.config = config;
    this.eventService = eventService;
    this.userService = userService;
    this.getData();
    this.nav = nav;
***REMOVED***

  goDetail(event) {
    this.nav.push(EventPage, { event: event ***REMOVED***);
***REMOVED***

  getData() {
    this.eventService.eventsChanged.subscribe(this.eventsChange.bind(this));
    this.eventService.getEvents();
    this.eventsLoadedDone = true;
***REMOVED***

  setPlayer(index) {
    this.eventService.togglePlayer(this.events[index].id, this.userService.userProfile.profile.userUUid);
***REMOVED***

  prepareEvent(event) {
    let userUUid = this.userService.userProfile.profile.userUUid;
    event.hide = event.hide ? event.hide : !this.config.get('isTablet');
    event.hideCount =  event.hideCount ? event.hideCount : 0;
    if (typeof event.data.players === 'object') {
      event.playerCount = event.data.players.length;
  ***REMOVED*** else {
      event.playerCount = 0;
  ***REMOVED***
    if (event.data.players && event.data.players.indexOf(userUUid) !== -1) {
      event.uuidInPlayers = true;
  ***REMOVED*** else {
      event.uuidInPlayers = false;
  ***REMOVED***
    return event;
***REMOVED***

  byId(event) {
    return 'id' in event && event.id === this.toString();
***REMOVED***

  changed(model) {
    let eventsIndex = findIndex(this.events, { id: model.id ***REMOVED***);
    this.events[eventsIndex] = this.prepareEvent(model);
***REMOVED***

  eventsChange(eventsChanged: any) {
    let userUUid = this.userService.userProfile.profile.userUUid;
    if (typeof eventsChanged === 'boolean') {
      this.events = this.eventService.events;
      this.events.forEach((event, index) => {
        this.events[index] = this.prepareEvent(event);
    ***REMOVED***);
  ***REMOVED***

    if ( typeof eventsChanged === 'object' && 'method' in eventsChanged) {
      this[eventsChanged.method](eventsChanged);
  ***REMOVED***
***REMOVED***

  toggleVisible(index) {
    this.events[index].hide = this.events[index].hide ? false: true;
    setTimeout(() => {
      this.events[index].hideCount = this.events[index].hide ? 0 : 1;
  ***REMOVED***, 1300);
***REMOVED***

  import() {
    this.eventService.setYear();
***REMOVED***
***REMOVED***