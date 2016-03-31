import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
//import {NgFirebase} from './ng-firebase';
import {Yolo} from './../yolo/yolo';

@Injectable()
class LoginService extends Yolo.Model {
  private _db: any;
  private _email: string = '';
  private _password: string = '';
  private _rememberMe: boolean = false;

  public log: any = new EventEmitter();

  constructor() {
    //DbService: NgFirebase.DBService
    super({
      email: '',
      password: '',
      rememberMe: false
    });
    // debugger;
    // // this._db = DbService.db;
    // console.log('Login', this.attributes);
  }
  public onOutCallback(authData) {
    if (authData) {
      // console.log("Authenticated with uid:", authData);
    } else {
      // console.log("Client unauthenticated.")
    }
  }
  public authWithPassword(): any {
    return this._db.authWithPassword({
      "email": this.map.get('email'),
      "password": this.map.get('password')
    }, function(error, authData) {
      this._db.onAuth(this.onOutCallback);
      this._db.offAuth(this.onOutCallback);
      if (error) {
        return this.log.error(error);
      } else {
        debugger;
        // this.loggedInUser = authData;
        // return resolve(authData);
      }
    });
  }
  public set email(v: string) {
    this.map.set('email', v);
  }

  public set password(v: string) {
    this.map.set('password', v);
  }

  public set rememberMe(v: boolean) {
    this.map.set('rememberMe', v);
  }

  public set db(v: any) {
    this._db = v;
  }

  public get db() : any {
    return this._db;
  }

}

module LoginService { };
export {LoginService as LoginServiceTemp};
