import {Component, Validators, Control, ControlGroup, NgClass} from 'angular2/angular2';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {DBService} from './../../db/service/db';
import {UserService} from '../../db/service/user';
import {SignupPage} from './../../auth/page/signup';

@Page({
  templateUrl: 'auth/templates/login.html'
})
export class LoginPage {
  constructor(app: IonicApp, nav: NavController, dbService: DBService, userService: UserService) {
    this.userOnLogin = false;
    this.userService = userService;
    this.localStore = JSON.parse(localStorage.getItem('remember'));
    this.dbService = dbService;
    this.app = app;
    this.form = new ControlGroup({
      email: new Control(this.localStore && this.localStore.remember ? this.localStore.email : '', Validators.required),
      password: new Control(this.localStore && this.localStore.remember ? this.localStore.password : '', Validators.required),
      remember: new Control(this.localStore && this.localStore.remember ? this.localStore.remember : false)
    });
    // this.signupPage = SignupPage;
    this.forgotPasswordPage = ForgotPasswordPage;
    this.signupPage = SignupPage;
    this.loginData = {};
  }
  
  doLogin(event) {
    var self = this;
    console.log(this);
    if (this.form.valid) {
      if (self.form.value.remember) {
        localStorage.setItem('remember', JSON.stringify(self.form.value));
      } else {
        localStorage.removeItem('remember');
      }
      this.userOnLogin = true;
      this.dbService.authWithPassword(this.form.value.email, this.form.value.password).then((resp) => {
        self.userOnLogin = false;
        console.log("Authenticated user with uid:", resp.uid);
        self.userService.getUserProfile();
      });
    }

    event.preventDefault();
  }
}

@Page({
  templateUrl: 'auth/templates/forgot-password.html'
})
export class ForgotPasswordPage {
  constructor(app: IonicApp, nav: NavController) {
    this.email = "";
    this.form = new ControlGroup({
      email: new Control('', Validators.required),
    });
  }
  doForgotPassword(event) {
    console.log('Resetting password for user', this.email);

    // Maybe reset their password here.

    event.preventDefault();
  }
}