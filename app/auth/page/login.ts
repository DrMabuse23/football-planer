import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf} from 'angular2/common';
import {IonicApp, Page, NavController, Alert} from 'ionic-angular';
import {NgFirebase} from './../../modules/ngfb/ng-firebase';
import {UserService} from '../../db/service/user';
import {SignupPage} from './../../auth/page/signup';
import {PasswordResetPage} from './../../auth/page/password-reset';
import {HomePage} from './../../home/page/home-page';


@Page({
  templateUrl: 'build/auth/templates/login.html'
})
export class LoginPage {
  private app: IonicApp;
  private nav: NavController;
  private form: ControlGroup;
  private localStore: any;

  public userOnLogin: boolean;
  public userService: UserService;
  private dbService: NgFirebase.DBService;
  private homePage: any;
  private signupPage: any;
  private passwordResetPage: any;
  private loginData: any;


  constructor(app: IonicApp, nav: NavController, dbService: NgFirebase.DBService, userService: UserService) {
    this.userOnLogin = false;
    this.userService = userService;
    this.localStore = JSON.parse(localStorage.getItem('remember'));
    this.dbService = dbService;
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
    let self = this;
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
      this.doAlert();
    }
    event.preventDefault();
  }

  loginDb() {
    let self = this;
    this.dbService.authWithPassword(this.form.value.email, this.form.value.password).then((resp) => {
      self.userOnLogin = false;
      // console.log("Authenticated user with uid:", resp.uid)
      self.userService.getUserProfile().then(() => {
        if (resp.password.isTemporaryPassword) {
          // console.log('resp.password.isTemporaryPassword', resp.password.isTemporaryPassword);
          //console.table(resp);
        } else {
          self.nav.setRoot(self.homePage);
        }
      });
    }).catch((err) => {
      // console.table(error);
      this.userOnLogin = false;
      self.doAlert(err.message);
    });
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
