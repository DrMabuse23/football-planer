import {Validators, Control, ControlGroup***REMOVED*** from 'angular2/angular2';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';


@Page({
  templateUrl: 'auth/login.html'
***REMOVED***)
export class LoginPage {
  constructor(app: IonicApp, nav: NavController) {
    this.form = new ControlGroup({
      email: new Control('', Validators.required),
      password: new Control('', Validators.required),
  ***REMOVED***);

    // this.signupPage = SignupPage;
    this.forgotPasswordPage = ForgotPasswordPage;

    this.loginData = {***REMOVED***;
***REMOVED***

  doLogin(event) {
    console.log('Doing login', this.form.value);

    // Handle the login here:

    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
***REMOVED***
***REMOVED***

@Page({
  templateUrl: 'auth/forgot-password.html'
***REMOVED***)
export class ForgotPasswordPage {
  constructor(app: IonicApp, nav: NavController) {
    this.email = "";
***REMOVED***
  doForgotPassword(event) {
    console.log('Resetting password for user', this.email);

    // Maybe reset their password here.

    event.preventDefault();
***REMOVED***
***REMOVED***