import {Validators, Control, ControlGroup***REMOVED*** from 'angular2/angular2';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
import {LoginPage***REMOVED*** from './login';
import {DBService***REMOVED*** from './../db/db';

@Page({
  templateUrl: 'auth/signup.html'
***REMOVED***)
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
  ***REMOVED***);
    this.signupData = {***REMOVED***;
    this.loginPage = LoginPage;
***REMOVED***

  doSignup(event) {
    console.log(this.dbService);
    console.log('Doing login', this.form.value);
    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
***REMOVED***
***REMOVED***