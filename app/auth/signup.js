import {Validators, Control, ControlGroup, FormBuilder***REMOVED*** from 'angular2/angular2';
import { isBlank***REMOVED*** from 'angular2/src/facade/lang';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
import {LoginPage***REMOVED*** from './login';
import {DBService***REMOVED*** from './../db/db';
class SignUpValidator {

  static confirm(firstValue, secondValue) {
    if (isBlank(firstValue) || isBlank(secondValue)) {
      return null;
  ***REMOVED***
    if (firstValue !== secondValue) {
      return null;
  ***REMOVED***
    return true;
***REMOVED***

  static isEmail(email) {
    var re = /[a-z0-9!#$%&'*+=?^_`{|***REMOVED***~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|***REMOVED***~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    return re.test(email)
***REMOVED***
***REMOVED***
@Page({
  templateUrl: 'auth/signup.html'
***REMOVED***)
export class SignupPage {
  constructor(app: IonicApp, nav: NavController, dbService: DBService, fb: FormBuilder) {
    this.dbService = dbService;
    this.app = app;
    this.form = new ControlGroup({
      email: new Control('drmabuse@posteo.de', Validators.compose([Validators.required, SignUpValidator.isEmail])),
      password: new Control('test12345', Validators.required),
      passwordConfirm: new Control('test1ss2345', Validators.compose([Validators.required, this.confirmPassword('password')])),
      firstName: new Control('Pascal', Validators.required),
      lastName: new Control('Brewing', Validators.required),
      mobile: new Control('017647209049', Validators.required)
  ***REMOVED***);
    this.signupData = {***REMOVED***;
    this.loginPage = LoginPage;
***REMOVED***
  confirmPassword(control: string) {
    return (myControl) => {
      console.log('may is equal', myControl);
      if (this.form && this.form.controls[control]) {
        if (this.form.controls[control].value !== myControl.value) {
          console.log('password is equal', myControl, this.form.controls[control].value);
          return { 'confirmPassword': true ***REMOVED***
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
***REMOVED***

  doSignup(event) {
    console.log('Doing login', this.form);
    if (this.form.valid) {
      //this.registerUser();
  ***REMOVED*** else {
      
      console.log('error', this.form);
  ***REMOVED***
    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
***REMOVED***

  registerUser() {
    return new Promise((resolve, reject) => {
      this.dbService.db.createUser({
        email: this.form.value.email,
        password: this.form.value.password
    ***REMOVED***, function (error, userData) {
  ***REMOVED***
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
        ***REMOVED***
          return reject(error);
      ***REMOVED*** else {
          console.log("Successfully created user account with uid:", );
          return resolve(userData.uid);
      ***REMOVED***
    ***REMOVED***)
  ***REMOVED***);
***REMOVED***
***REMOVED***