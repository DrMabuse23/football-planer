import {Validators, Control, ControlGroup, NgIf} from 'angular2/angular2';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {DBService} from './../db/db';
import {SignupPage} from './signup';

@Page({
  templateUrl: 'auth/login.html',
  directives: [NgIf]
})
export class LoginPage {
  constructor(app: IonicApp, nav: NavController, dbService: DBService) {
    this.dbService = dbService;
    this.dbServiceIsLoggedIn = this.dbService.dbAuth; 
    this.app = app;
    this.form = new ControlGroup({
      email: new Control('', Validators.required),
      password: new Control('', Validators.required),
    });
    
    // this.signupPage = SignupPage;
    this.forgotPasswordPage = ForgotPasswordPage;
    this.signupPage = SignupPage;
    this.loginData = {};
  }

  doLogin(event) {
    this.dbServiceIsLoggedIn = this.dbService.dbAuth; 
    console.log(this.dbService);
    console.log('Doing login', this.form.value);

    // Handle the login here:

    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
  }
}

@Page({
  templateUrl: 'auth/forgot-password.html'
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