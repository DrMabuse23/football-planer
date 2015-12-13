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

  constructor(config: Config, dbService: DBService, placeService: PlaceService) {
    this.dbService = dbService;
    this.placeService = placeService;
    this.eventsChanged = new EventEmitter();
    this.ref = this.dbService.db.child("events");
    moment.locale(config.get('locale'));
  }

  isPlayed (playedTime) {
    let now = new Date().getTime();
    if (now > playedTime) {
      return false;
    }
    return true;
  }

  getEvents() {
    let self = this;
    this.placeService.getPlaces();
    this.ref.orderByChild('playDate').on('value', (snapshot) => {
      if (typeof snapshot === 'object') {
        let i = 0;
        snapshot.forEach((data) => {
          let model = {
            data: data.val(),
            id: data.key()
          };
          if (self.isPlayed(model.data.playDate)) {
            self.events.push(model);
            self.events[i].place = self.placeService.getPlaceById(self.events[i].data.place);
            self.events[i].date = moment(self.events[i].data.playDate).format('LLL');
            self.events[i].comments = [];
            i++;
          } else {
            self.updateEvent(model.id, { 'played': true });
          }
        });
        self.eventsChanged.next(true);
      }
    }, (err) => console.error(err));
  }

  updateEvent(id, attr) {
    var eventRef = this.ref.child(id);
    eventRef.update(attr);
  };

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
        }, (err) => {
          //debugger;
          if (err) {
            console.log("Data could not be saved." + err);
          } else {
            console.log("Data saved successfully.");
          }
          });
          time = time + oneWeek;
        // console.log(i);
        //console.log('time', time);
        //console.log('d.getDay()', next.getDay());
        //console.log(i10n.DAY[next.getDay()]);
        //console.log('d.getMonth()', next.getMonth());
        //console.log('getYear', next.getFullYear());
        //console.log(next);
      }
    }
  }
}