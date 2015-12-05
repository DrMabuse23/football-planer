import {Validators, Control, ControlGroup, FormBuilder***REMOVED*** from 'angular2/angular2';
import {isBlank***REMOVED*** from 'angular2/src/facade/lang';
import {IonicApp, Page, NavController***REMOVED*** from 'ionic/ionic';
import {LoginPage***REMOVED*** from './../../auth/page/login';
import {DBService***REMOVED*** from '../../db/service/db';
import {UserService***REMOVED*** from '../../db/service/user';


@Page({
  templateUrl: './../../auth/templates/signup.html'
***REMOVED***)
export class SignupPage {
  form: ControlGroup;
  constructor(app: IonicApp, nav: NavController, dbService: DBService, fb:FormBuilder, userService: UserService) {
    this.dbService = dbService;
    this.userService = userService;
    this.app = app;
    this.form = fb.group({
      matchingPassword: fb.group({
        password: ['test1234', Validators.required],
        passwordConfirm: ['test12345', Validators.required]
    ***REMOVED***, {validator: this.areEqual***REMOVED***),
      email: new Control('horst@posteo.de', Validators.compose([Validators.required])),
      firstName: new Control('Horst', Validators.required),
      lastName: new Control('Hugo', Validators.required),
      mobile: new Control('017647343520', Validators.compose([Validators.required, this.isPhoneNumber]))
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
    if (valid) {
      return null;
  ***REMOVED***
    return {
      areEqual: true
  ***REMOVED***;
***REMOVED***
  
  isEmail(control: Control) {
    let valid = false;
    let re = /[a-z0-9!#$%&'*+=?^_`{|***REMOVED***~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|***REMOVED***~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (control && control.value) {
      if (re.test(control.value)) {
        valid = true;
    ***REMOVED***
  ***REMOVED***
    if (valid) {
      return null;
  ***REMOVED***
    return { 
      'isEmail': true 
  ***REMOVED***;  
***REMOVED***
  
  isPhoneNumber(control: Control) {
    let valid = false;
    let re = /^\s*(?:\+?(\d{1,3***REMOVED***))?([-. (]*(\d{3***REMOVED***)[-. )]*)?((\d{3***REMOVED***)[-. ]*(\d{2,4***REMOVED***)(?:[-.x ]*(\d+))?)\s*$/gm;
    if (control && control.value) {
      if (re.test(Number(control.value))) {
        valid = true;
    ***REMOVED***
  ***REMOVED***
    if (valid) {
      return null;
  ***REMOVED***
    return {
      isPhoneNumber: true
  ***REMOVED***;
***REMOVED***
  
  doSignup(event) {
    console.log('Doing login', this.form);
    if (this.form.valid) {
      this.userService.registerUser(this.form).then(() => {
        console.log('user added');
    ***REMOVED***).catch(err => console.error(err));
  ***REMOVED*** else {
      console.log('error', this.form.controls.mobile);
  ***REMOVED***
    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
***REMOVED***
***REMOVED***