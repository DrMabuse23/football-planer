import {Validators, Control, ControlGroup} from 'angular2/common';
import {NavController, Alert} from 'ionic-angular';
import {Injectable, EventEmitter} from 'angular2/core';
import {Observable} from 'rxjs/Observable';
import {DBServiceTemp} from './db';

import 'rxjs/add/operator/map';

import {LoginModelTemp} from './models/login';
import {LoginFormTemp} from './models/login-form';

@Injectable()
class LoginService {

  private _db: any;
  public log: any;

  private _controlGroup : LoginFormTemp;
  private _model : LoginModelTemp = new LoginModelTemp();

  constructor(dbService: DBServiceTemp, nav: NavController) {
    this.log = new EventEmitter();
    this.db = dbService.db;
    this._controlGroup = new LoginFormTemp (this.model);
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
      "email": this.model.email,
      "password": this.model.password
    }, function(error, authData) {
      if (error) {
        that.errorAlert(error, 'Ups da ist was schief gegangen');
        return that.log.error(error);
      }
      return that.log.next(authData);
    });
  }

  public login(){
    let self = this;
    if (this.form.valid) {
      this.model.apply(this.form.value);
      if (this.form.value.remember) {
        localStorage.setItem('remember', JSON.stringify(this.form.value));
      } else {
        localStorage.removeItem('remember');
      }
      this.authWithPassword();
    } else {
      this.errorAlert('Ihr Daten sind nicht valide', JSON.stringify(this.form.errors, null, 2));
    }
    event.preventDefault();

  }
  public get controlGroup() : Form {
    return this._controlGroup;
  }

  public get model() : LoginModelTemp {
    return this._model;
  }
  /**
   * set the db
   */
  public set db(v: any) {
    this._db = v;
  }
  /**
   * catch the Error
   */
  errorAlert(message: string = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass = 'danger') {
    let alert = Alert.create({
      title: title,
      message: message,
      cssClass: cssClass
    });
    this.nav.present(alert);
  }
}

module LoginService { };
export {LoginService as LoginServiceTemp};
