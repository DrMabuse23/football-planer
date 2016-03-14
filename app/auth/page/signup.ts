import {Validators, Control, ControlGroup, FormBuilder***REMOVED*** from 'angular2/common';
import {isBlank***REMOVED*** from 'angular2/src/facade/lang';
import {IonicApp, Page, NavController, Alert***REMOVED*** from 'ionic-angular';
import {DBService***REMOVED*** from '../../db/service/db';
import {UserService***REMOVED*** from '../../db/service/user';
// import {ErrorItemComponent***REMOVED*** from './../component/error-required';

@Page({
  templateUrl: 'build/auth/templates/signup.html'
***REMOVED***)
export class SignupPage {
  app: IonicApp;
  nav: NavController;
  form: any;

  dbService: DBService;
  userService: UserService;
  signupData: any;

  constructor(app: IonicApp, nav: NavController, dbService: DBService, fb: FormBuilder, userService: UserService) {

    this.dbService = dbService;
    this.userService = userService;
    this.app = app;
    this.nav = nav;
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
    // debugger;
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
      let self = this;
      this.userService.registerUser(this.form).then(() => {
        this.doAlert('Registrierung abgeschlossen', 'Erfolgreich', 'pink');
        setTimeout(() => {
          self.nav.pop()
      ***REMOVED***, 1000)
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

  doAlert(message: string = 'Ein Fehler ist aufgereten', title:string = 'Fehler', cssClass: string='danger') {
    let alert =  Alert.create({
      title: title,
      message: message,
      cssClass: cssClass
  ***REMOVED***);
    this.nav.present(alert);
***REMOVED***
***REMOVED***