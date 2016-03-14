import {NgClass, Disabled, NgIf, NgFor, NgSwitch, NgModel} from 'angular2/common';
import {Page, NavParams, Config} from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {findIndex} from 'lodash';
import {UserService} from '../../db/service/user';
import {EventsService} from './../services/events';

@Page({
  templateUrl: 'build/events/templates/event.html',
  providers: [EventsService]
})
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
    },
    (error) => { console.error(error) },
    () => { });

  constructor(navParams: NavParams, eventService: EventsService, userService: UserService, config: Config) {
    this.isAndroid = config.get('mode') == 'md' ? '' : null;
    this.params = navParams;
    this.event = this.params.get('event');
    this.players = null;
    this.tab = 'one';
    userService.getProfilesByIds(this.event.data.players).then((profiles) => {
      this.players = profiles;
    });
  }
  loadMap() {
    let latlng = { lat: Number(this.event.place.address.lat), lng: Number(this.event.place.address.long) };
    var styleArray = [
      {
        featureType: "all",
        stylers: [
          { saturation: -80 }
        ]
      }, {
        featureType: "road.arterial",
        elementType: "geometry",
        stylers: [
          { hue: "#E8EAF6" },
          { saturation: 50 }
        ]
      }, {
        featureType: "poi.business",
        elementType: "labels",
        stylers: [
          { visibility: "off" }
        ]
      }
    ];

    let map = new google.maps.Map(
      document.getElementById('map'),
      {
        zoom: 16,
        center: latlng
      }
    );

    let marker = new google.maps.Marker({
      position: latlng,
      map: map,
      title: this.event.place.name
    });

  }
  onPageLoaded() {
    this.loadMap();
  }

  onSegmentChanged(event) {
    this.tab = event;
  }

  eventsChange(eventsChanged: any) {
    console.log(eventsChanged);
  }
}