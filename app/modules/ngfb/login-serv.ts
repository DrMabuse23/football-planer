import {Validators, Control, ControlGroup} from 'angular2/common';
import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {DBServiceTemp} from './db';

import 'rxjs/add/operator/map';
import {Yolo} from './../yolo/yolo';

@Injectable()
class LoginService extends Yolo.Model {

  private _db: any;
  public log: any;

  constructor(dbService: DBServiceTemp) {
    super({ email: '', password: '', remember: false });
    this.log = new EventEmitter();
    this.db = dbService.db;
    // set the form group
    this.rules = {
      email: [Validators.required],
      password: [Validators.required]
    };
    this.init();
  }

  public onOutCallback(authData) {
    if (authData) {
      // console.log("Authenticated with uid:", authData);
    } else {
      // console.log("Client unauthenticated.")
    }
  }
  /**
   * @link https://www.firebase.com/docs/web/api/firebase/authwithpassword.html
   */
  public authWithPassword(): any {
    let that = this;
    return this._db.authWithPassword({
      "email": this.get('email'),
      "password": this.get('password')
    }, function(error, authData) {
      if (error) {
        return that.log.error(error);
      }
      return that.log.next(authData);
    });
  }
  /**
   * set the db
   */
  public set db(v: any) {
    this._db = v;
  }
}

module LoginService { };
export {LoginService as LoginServiceTemp};
