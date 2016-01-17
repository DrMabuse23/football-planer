import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf***REMOVED*** from 'angular2/common';
import {IonicApp, Page, NavController, Alert***REMOVED*** from 'ionic/ionic';
import {DBService***REMOVED*** from './../../db/service/db';
import {UserService***REMOVED*** from '../../db/service/user';
import {SignupPage***REMOVED*** from './../../auth/page/signup';
import {PasswordResetPage***REMOVED*** from './../../auth/page/password-reset';
import {HomePage***REMOVED*** from './../../home/page/home-page';


@Page({
  templateUrl: 'auth/templates/login.html'
***REMOVED***)
export class LoginPage {
  app: IonicApp;
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


  constructor(app: IonicApp, nav: NavController, dbService: DBService, userService: UserService) {
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
  ***REMOVED***);
    this.loginData = {***REMOVED***;
    this.signupPage = SignupPage;
    this.homePage = HomePage;
    this.passwordResetPage = PasswordResetPage;
    if (this.form.valid) {
      this.loginDb();
  ***REMOVED***
***REMOVED***

  doLogin(event) {
    let self = this;
    if (this.form.valid) {
      if (self.form.value.remember) {
        localStorage.setItem('remember', JSON.stringify(self.form.value));
    ***REMOVED*** else {
        localStorage.removeItem('remember');
    ***REMOVED***
      this.userOnLogin = true;
      let nav = this.app.getComponent('nav');
      this.loginDb();

  ***REMOVED*** else {
      this.userOnLogin = false;
      self.doAlert();
  ***REMOVED***
    event.preventDefault();
***REMOVED***

  loginDb() {
    let self = this;
    this.dbService.authWithPassword(this.form.value.email, this.form.value.password).then((resp) => {
      self.userOnLogin = false;
      console.log("Authenticated user with uid:", resp.uid)
      self.userService.getUserProfile().then(() => {
        if (resp.password.isTemporaryPassword) {
          console.log('resp.password.isTemporaryPassword', resp.password.isTemporaryPassword);
          //console.table(resp);
      ***REMOVED*** else {
          self.nav.setRoot(self.homePage);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED***).catch((err) => {
      // console.table(error);
      this.userOnLogin = false;
      self.doAlert(err.message);
  ***REMOVED***);
***REMOVED***
  doAlert(message: String = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass = 'danger') {
    let alert = Alert.create({
      title: title,
      template: message,
      cssClass: cssClass
  ***REMOVED***);
    this.nav.present(alert);
***REMOVED***
***REMOVED***