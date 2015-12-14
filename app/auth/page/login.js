import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf***REMOVED*** from 'angular2/core';
import {IonicApp, Page, NavController, Popup***REMOVED*** from 'ionic/ionic';
import {DBService***REMOVED*** from './../../db/service/db';
import {UserService***REMOVED*** from '../../db/service/user';
import {SignupPage***REMOVED*** from './../../auth/page/signup';
import {HomePage***REMOVED*** from './../../home/page/home-page';


@Page({
  templateUrl: 'auth/templates/login.html'
***REMOVED***)
export class LoginPage {
  constructor(app: IonicApp, nav: NavController, dbService: DBService, userService: UserService, popup: Popup) {
    this.userOnLogin = false;
    this.userService = userService;
    this.localStore = JSON.parse(localStorage.getItem('remember'));
    this.dbService = dbService;
    this.popup = popup;
    this.app = app;
    this.form = new ControlGroup({
      email: new Control(this.localStore && this.localStore.remember ? this.localStore.email : '', Validators.required),
      password: new Control(this.localStore && this.localStore.remember ? this.localStore.password : '', Validators.required),
      remember: new Control(this.localStore && this.localStore.remember ? this.localStore.remember : false)
  ***REMOVED***);
    // this.signupPage = SignupPage;
    this.homePage = HomePage;
    this.forgotPasswordPage = ForgotPasswordPage;
    this.signupPage = SignupPage;
    this.loginData = {***REMOVED***;
***REMOVED***

  doLogin(event) {
    var self = this;
    console.log(this);
    if (this.form.valid) {
      if (self.form.value.remember) {
        localStorage.setItem('remember', JSON.stringify(self.form.value));
    ***REMOVED*** else {
        localStorage.removeItem('remember');
    ***REMOVED***
      this.userOnLogin = true;
      let nav = this.app.getComponent('nav');
      this.dbService.authWithPassword(this.form.value.email, this.form.value.password).then((resp) => {
        self.userOnLogin = false;
        console.log("Authenticated user with uid:", resp.uid);
        self.userService.getUserProfile().then(() => {
          nav.setRoot(self.homePage);
      ***REMOVED***);
    ***REMOVED***).catch((err) => {
        this.userOnLogin = false;
        self.doAlert(err.message);
    ***REMOVED***);
  ***REMOVED*** else {
      this.userOnLogin = false;
      self.doAlert();
  ***REMOVED***
    event.preventDefault();
***REMOVED***

  doAlert(message: String = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass = 'danger') {
    this.popup.alert({
      title: title,
      template: message,
      cssClass: cssClass
  ***REMOVED***).then(() => {
      console.log('Alert closed');
  ***REMOVED***);
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