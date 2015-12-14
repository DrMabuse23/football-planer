import {Validators, Control, ControlGroup, FormBuilder***REMOVED*** from 'angular2/core';
import {isBlank***REMOVED*** from 'angular2/src/facade/lang';
import {IonicApp, Page, NavController, Popup***REMOVED*** from 'ionic/ionic';
import {LoginPage***REMOVED*** from './../../auth/page/login';
import {DBService***REMOVED*** from '../../db/service/db';
import {UserService***REMOVED*** from '../../db/service/user';


@Page({
  templateUrl: 'auth/templates/signup.html'
***REMOVED***)
export class SignupPage {
  form: ControlGroup;
  constructor(app: IonicApp, nav: NavController, popup: Popup, dbService: DBService, fb: FormBuilder, userService: UserService) {
    this.dbService = dbService;
    this.userService = userService;
    this.popup = popup;
    this.app = app;
    this.form = fb.group({
      matchingPassword: fb.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
    ***REMOVED***, { validator: this.areEqual ***REMOVED***),
      email: new Control('', Validators.compose([Validators.required, this.isEmail])),
      firstName: new Control('', Validators.required),
      lastName: new Control('', Validators.required),
      mobile: new Control('', Validators.compose([Validators.required, this.isPhoneNumber]))
  ***REMOVED***);
    this.signupData = {***REMOVED***;
    this.loginPage = LoginPage;
***REMOVED***

  areEqual(group: ControlGroup) {
    let val;
    let valid = true;
    for (name in group.controls) {
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
    if (this.form.valid) {
      this.userService.registerUser(this.form).then(() => {
    ***REMOVED***).catch(error => {
        switch (error.code) {
          case "EMAIL_TAKEN":
            this.doAlert('Email ist schon in Benutzung')
            break;
          case "INVALID_EMAIL":
            this.doAlert('Email ist keine valide Email')
            break;
          default:
            this.doAlert(`unbestimmer Fehler beim anlegen dieses Users ${error.message***REMOVED***`);
      ***REMOVED***
    ***REMOVED***);
  ***REMOVED*** else {
      console.log('error', this.form.controls.mobile);
  ***REMOVED***

    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
***REMOVED***

  doAlert(message: String = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass='danger') {
    this.popup.alert({
      title: title,
      template: message,
      cssClass: cssClass
  ***REMOVED***).then(() => {
      console.log('Alert closed');
  ***REMOVED***);
***REMOVED***
***REMOVED***