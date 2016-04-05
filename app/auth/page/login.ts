import {Validators, Control, ControlGroup, NgClass, NgIf} from 'angular2/common';
import {Component} from 'angular2/core';
import {IonicApp, Page, NavController, Alert} from 'ionic-angular';
import {NgFirebase} from './../../modules/ngfb/ng-firebase';
import {UserService} from '../../db/service/user';
import {SignupPage} from './../../auth/page/signup';
import {PasswordResetPage} from './../../auth/page/password-reset';
import {HomePage} from './../../home/page/home-page';

@Page({
  templateUrl: 'build/auth/templates/login.html',
  providers: [NgFirebase.LoginService]
})
export class LoginPage {
  private app: IonicApp;
  private nav: NavController;
  private form: ControlGroup;
  private localStore: any;
  private _loginService: NgFirebase.LoginService;

  public userOnLogin: boolean;
  public userService: UserService;

  private homePage: any;
  private signupPage: any;
  private passwordResetPage: any;
  private loginData: any;


  constructor(app: IonicApp, nav: NavController, loginService: NgFirebase.LoginService, userService: UserService) {
    this.app = app;
    this.nav = nav;

    this.userOnLogin = false;
    this.userService = userService;
    this.localStore = JSON.parse(localStorage.getItem('remember'));

    this._loginService = loginService;

    this.form = this._loginService.controlGroup;
    this.loginData = {};
    this.signupPage = SignupPage;
    this.homePage = HomePage;
    this.passwordResetPage = PasswordResetPage;
    // if (this.form.valid) {
    //   this.loginDb();
    // }
  }

  doLogin(event) {
    let self = this;
    this._loginService.apply(this.form.value);
    //debugger;
    if (this.form.valid) {
      if (self.form.value.remember) {
        localStorage.setItem('remember', JSON.stringify(self.form.value));
      } else {
        localStorage.removeItem('remember');
      }
      this.userOnLogin = true;
      let nav = this.app.getComponent('nav');
      this._loginService.authWithPassword();
    } else {
      this.userOnLogin = false;
      this.doAlert();
    }
    event.preventDefault();
  }

  doAlert(message: string = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass = 'danger') {
    let alert = Alert.create({
      title: title,
      message: message,
      cssClass: cssClass
    });
    this.nav.present(alert);
  }
}
