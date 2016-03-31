import {Injectable} from 'angular2/core';
import {NgFirebase} from './../../modules/ngfb/ng-firebase';

@Injectable()
export class PlaceService {
  dbService: NgFirebase.DBService;
  places: Object = {};

  constructor(dbService: NgFirebase.DBService) {
    this.dbService = dbService;
  }

  getPlaceById(uuid) {
    return this.places[uuid];
  }

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
          });
          // console.log(self.places);
          return resolve(self.places);
        }
      }, (err) => {
        console.error(err);
        return reject(err);
      });
    })
  }
}
