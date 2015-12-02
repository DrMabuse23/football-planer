import {Validators, Control, ControlGroup, FormBuilder***REMOVED*** from 'angular2/angular2';
import {isBlank***REMOVED*** from 'angular2/src/facade/lang';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
import {LoginPage***REMOVED*** from './../../auth/page/login';
import {DBService***REMOVED*** from '../../db/service/db';
// class SignUpValidator {
// 
//   static confirm(firstValue, secondValue) {
//     if (isBlank(firstValue) || isBlank(secondValue)) {
//       return null;
//   ***REMOVED***
//     if (firstValue !== secondValue) {
//       return null;
//   ***REMOVED***
//     return true;
// ***REMOVED***
//   static isEmail(control: Object) {
//     if (control && control.value) {
//       let re = /[a-z0-9!#$%&'*+=?^_`{|***REMOVED***~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|***REMOVED***~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
//       //console.log('isEmail', re.test(control.value))
//       return { 'isEmail': re.test(control.value) ***REMOVED***;  
//   ***REMOVED***
// ***REMOVED***
//   static isPhoneNumber(control: Object) {
//     console.log(typeof control.value);
//     if (control && control.value) {
//       let re = /^\s*(?:\+?(\d{1,3***REMOVED***))?([-. (]*(\d{3***REMOVED***)[-. )]*)?((\d{3***REMOVED***)[-. ]*(\d{2,4***REMOVED***)(?:[-.x ]*(\d+))?)\s*$/gm;
//       console.log('isPhoneNumber', re.test(Number(control.value)))
//       if (re.test(Number(control.value))) {
//         return null;
//     ***REMOVED***
//       return { 'isPhoneNumber': true ***REMOVED***;  
//   ***REMOVED***
// ***REMOVED***
// ***REMOVED***

@Page({
  templateUrl: './../../auth/templates/signup.html'
  
***REMOVED***)
export class SignupPage {
  form: ControlGroup;
  constructor(app: IonicApp, nav: NavController, dbService: DBService, fb:FormBuilder) {
    this.dbService = dbService;
    this.app = app;
    this.form = fb.group({
      matchingPassword: fb.group({
        password: ['test1234', Validators.required],
        passwordConfirm: ['test12345', Validators.required]
    ***REMOVED***, {validator: this.areEqual***REMOVED***),
      email: new Control('horst@posteo.de', Validators.compose([Validators.required])),
      firstName: new Control('Horst', Validators.required),
      lastName: new Control('Hugo', Validators.required),
      mobile: new Control('017647343520', Validators.compose([Validators.required]))
  ***REMOVED***);
    this.signupData = {***REMOVED***;
    this.loginPage = LoginPage;
    console.log(this.dbService);
***REMOVED***
  
  areEqual(group: ControlGroup) {
    let val;
    let valid = true;
    
    for (name in group.controls) {
      console.log(name);
      if (val === undefined) {
        val = group.controls[name].value
    ***REMOVED*** else {
        if (val !== group.controls[name].value) {
          valid = false;
          break;
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***
    console.log(valid);
    if (valid) {
      return null;
  ***REMOVED***

    return {
      areEqual: true
  ***REMOVED***;
***REMOVED***
  
  doSignup(event) {
    console.log('Doing login', this.form);
    if (this.form.valid) {
      //this.registerUser();
  ***REMOVED*** else {
      console.log('error', this.form.controls.mobile);
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