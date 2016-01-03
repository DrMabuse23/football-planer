import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf} from 'angular2/common';
import {IonicApp, Page, NavController, Popup} from 'ionic/ionic';
import {DBService} from './../../db/service/db';
import {UserService} from '../../db/service/user';
import {SignupPage} from './../../auth/page/signup';
import {PasswordResetPage} from './../../auth/page/password-reset';
import {HomePage} from './../../home/page/home-page';


@Page({
  templateUrl: 'auth/templates/login.html'
})
export class LoginPage {
  app: IonicApp;
  popup: Popup;
  nav: NavController;
  form: ControlGroup;

  localStore: any;
  userOnLogin: boolean;
  userService: UserService;
  dbService: DBService;
  homePage: any;
  signupPage: any;
  passwordResetPage: any;
  loginData: any;


  constructor(app: IonicApp, nav: NavController, dbService: DBService, userService: UserService, popup: Popup) {
    this.userOnLogin = false;
    this.userService = userService;
    this.localStore = JSON.parse(localStorage.getItem('remember'));
    this.dbService = dbService;
    this.popup = popup;
    this.app = app;
    this.nav = nav;
    this.form = new ControlGroup({
      email: new Control(this.localStore && this.localStore.remember ? this.localStore.email : '', Validators.required),
      password: new Control(this.localStore && this.localStore.remember ? this.localStore.password : '', Validators.required),
      remember: new Control(this.localStore && this.localStore.remember ? this.localStore.remember : true)
    });
    this.loginData = {};
    this.signupPage = SignupPage;
    this.homePage = HomePage;
    this.passwordResetPage = PasswordResetPage;
    if (this.form.valid) {
      this.loginDb();
    }
  }

  doLogin(event) {
    if (this.form.valid) {
      if (self.form.value.remember) {
        localStorage.setItem('remember', JSON.stringify(self.form.value));
      } else {
        localStorage.removeItem('remember');
      }
      this.userOnLogin = true;
      let nav = this.app.getComponent('nav');
      this.loginDb();

    } else {
      this.userOnLogin = false;
      self.doAlert();
    }
    event.preventDefault();
  }
  loginDb() {
    let self = this;
    this.dbService.authWithPassword(this.form.value.email, this.form.value.password).then((resp) => {
        self.userOnLogin = false;
        console.log("Authenticated user with uid:", resp.uid)
        self.userService.getUserProfile().then(() => {
          if (resp.password.isTemporaryPassword) {
            console.log('resp.password.isTemporaryPassword', resp.password.isTemporaryPassword);
          } else {
            self.nav.setRoot(self.homePage);
          }
        });
      }).catch((err) => {
        this.userOnLogin = false;
        self.doAlert(err.message);
      });
  }
  doAlert(message: String = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass = 'danger') {
    this.popup.alert({
      title: title,
      template: message,
      cssClass: cssClass
    }).then(() => {
      console.log('Alert closed');
    });
  }
}