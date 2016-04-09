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
  private localStore: any;
  private _loginService: NgFirebase.LoginService;

  public userOnLogin: boolean;
  public userService: UserService;

  private signupPage: any;
  private passwordResetPage: any;


  constructor(app: IonicApp, nav: NavController, loginService: NgFirebase.LoginService, userService: UserService) {
    this.app = app;
    this.nav = nav;

    this.userOnLogin = false;
    this.userService = userService;
    this.localStore = JSON.parse(localStorage.getItem('remember'));
    this._loginService = loginService;

    this.signupPage = SignupPage;
    this.passwordResetPage = PasswordResetPage;
    this.logListener();
  }

  logListener() {
    this._loginService.log.subscribe(
      this.loginSuccess.bind(this),
      this.loginFail.bind(this),
      this.loginFinally.bind(this)
    );
  }

  loginSuccess(authData: any) {
    this.userOnLogin = true;
    console.log('authData', authData);
  }

  loginFail(err) {
    this.userOnLogin = false;
    console.error(err);
  }

  loginFinally() {
    debugger;
    if (this.userOnLogin) {
      this.nav.setRoot(HomePage);
      this._loginService.log.unsubscribe();
    }
  }
}
