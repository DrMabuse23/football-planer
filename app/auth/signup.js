import {Validators, Control, ControlGroup} from 'angular2/angular2';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {LoginPage} from './login';
import {DBService} from './../db/db';

@Page({
  templateUrl: 'auth/signup.html'
})
export class SignupPage {
  constructor(app: IonicApp, nav: NavController, dbService: DBService) {
    this.dbService = dbService;
    this.app = app;
    this.form = new ControlGroup({
      email: new Control('', Validators.required),
      password: new Control('', Validators.required),
      passwordConfirm: new Control('', Validators.required),
      firstName: new Control('', Validators.required),
      lastName: new Control('', Validators.required),
      mobile: new Control('', Validators.required)
    });
    this.signupData = {};
    this.loginPage = LoginPage;
  }

  doSignup(event) {
    console.log(this.dbService);
    console.log('Doing login', this.form.value);
    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
  }
}