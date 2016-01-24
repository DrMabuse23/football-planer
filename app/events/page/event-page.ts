import {NgClass, Disabled, NgIf, NgFor, NgSwitch, NgModel***REMOVED*** from 'angular2/common';
import {Page, NavParams, Config***REMOVED*** from 'ionic/ionic';
***REMOVED***
import {findIndex***REMOVED*** from 'lodash';
import {UserService***REMOVED*** from '../../db/service/user';
import {EventsService***REMOVED*** from './../services/events';

@Page({
  templateUrl: 'events/templates/event.html',
  providers: [EventsService]
***REMOVED***)
export class EventPage {
  pages: any;
  root: any;
  config: Config;
  userService: UserService;
  eventService: EventsService
  event: any;

  eventsLoaded: Observable = new Observable(
    (eventsChanged: any) => {
      this.eventsChange(eventsChanged);
  ***REMOVED***,
    (error) => { console.error(error) ***REMOVED***,
    () => { ***REMOVED***);

  constructor(navParams: NavParams, eventService: EventsService, userService: UserService, config: Config) {
    this.isAndroid = config.get('mode') == 'md' ? '' : null;
    this.params = navParams;
    this.event = this.params.get('event');
    this.players = null;
    this.tab = 'one';
    userService.getProfilesByIds(this.event.data.players).then((profiles) => {
      this.players = profiles;
  ***REMOVED***);
    console.log('event', this.event);
***REMOVED***

  onSegmentChanged(event) {
    this.tab = event;
***REMOVED***
  eventsChange(eventsChanged: any) {
    console.log(eventsChanged);
***REMOVED***
***REMOVED***