import {Injectable, bind, EventEmitter} from 'angular2/angular2';
import {Config} from 'ionic/ionic';
import {DBService} from './../../db/service/db';
import {PlaceService} from './../../db/service/place';
import * as moment from 'moment';
@Injectable()
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
  }
  findById(item) {
    if ('id' in item) {

    }
  }
  isPlayed (playedTime) {
    let now = new Date().getTime();
    if (now > playedTime) {
      return false;
    }
    return true;
  }

  prepareEvent(event) {
    // debugger;
    event.place = this.placeService.getPlaceById(event.data.place);
    event.date = moment(event.data.playDate).format('LLL');
    event.comments = [];
    return event;
  }

  prepareEvents() {
    let self = this;
    self.events.forEach((event, i) => {
      this.events[i] = self.prepareEvent(event);
    });
    self.eventsChanged.next(true);
  }

  getEvents() {
    let self = this;
    this.placeService.getPlaces();
    if (!this.inProgress) {
      self.events = [];
      this.inProgress = true;
      this.ref.orderByChild('playDate').once('value', (snapshot) => {
        debugger;
        if (typeof snapshot === 'object') {
          let i = 0;
          snapshot.forEach((data) => {
            let model = {
              data: data.val(),
              id: data.key()
            };
            if (self.isPlayed(model.data.playDate)) {
              self.events.push(model);
              i++;
            } else {
              self.updateEvent(model.id, { 'played': true });
            }
          });
          self.childChanged();
          self.prepareEvents();
          self.inProgress = false;
        }
      }, (err) => console.error(err));
    }
  }

  childChanged() {
    let self = this;
    this.ref.on("child_changed",(snapshot) => {
      debugger;
      // let i = 0;
      // snapshot.forEach((data) => {
      //   let model = {
      //     data: data.val(),
      //     id: data.key()
      //   };
      //   if (self.isPlayed(model.data.playDate)) {
      //     self.events[i] = model;
      //     i++;
      //   } else {
      //     self.updateEvent(model.id, { 'played': true });
      //   }
      // });
      // self.prepareEvents();
      // self.inProgress = false;
      self.eventsChanged.next(self.prepareEvent({
        method: 'changed',
        data: snapshot.val(),
        id: snapshot.key()
      }));
    });
    this.ref.on("child_added", function(snapshot) {

    });
    this.ref.on("child_removed", function(snapshot) {

    });
  }
  updateEvent(id, attr) {
    let eventRef = this.ref.child(id);
    // debugger;
    return eventRef.update(attr);
  };

  setYear(year = 2016, place = '-K-m_vkLkNXg5P-RRmx5') {
    let self = this;
    let d = new Date(2015, 11, 13, 15, 30);
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
        }, (err) => {
          //debugger;
          if (err) {
            console.log("Data could not be saved." + err);
          } else {
            console.log("Data saved successfully.");
          }
          });
          time = time + oneWeek;
      }
    }
  }
}