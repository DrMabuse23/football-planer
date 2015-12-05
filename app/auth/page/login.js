import {Component, Validators, Control, ControlGroup, NgClass***REMOVED*** from 'angular2/angular2';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
import {DBService***REMOVED*** from './../../db/service/db';
import {SignupPage***REMOVED*** from './../../auth/page/signup';

@Page({
  templateUrl: 'auth/templates/login.html'
***REMOVED***)
export class LoginPage {
  constructor(app: IonicApp, nav: NavController, dbService: DBService) {
    this.dbService = dbService;
    this.app = app;
    this.form = new ControlGroup({
      email: new Control('', Validators.required),
      password: new Control('', Validators.required),
  ***REMOVED***);
    // this.signupPage = SignupPage;
    this.forgotPasswordPage = ForgotPasswordPage;
    this.signupPage = SignupPage;
    this.loginData = {***REMOVED***;
***REMOVED***
  doLogin(event) {
    console.log(this.dbService);
    console.log('Doing login', this.form.value);
    // Handle the login here:

    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
***REMOVED***
***REMOVED***

@Page({
  templateUrl: 'auth/templates/forgot-password.html'  
***REMOVED***)
export class ForgotPasswordPage {
  constructor(app: IonicApp, nav: NavController) {
    this.email = "";
     this.form = new ControlGroup({
      email: new Control('', Validators.required),
  ***REMOVED***);
***REMOVED***
  doForgotPassword(event) {
    console.log('Resetting password for user', this.email);

    // Maybe reset their password here.

    event.preventDefault();
***REMOVED***
***REMOVED***