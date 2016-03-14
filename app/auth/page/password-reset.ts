import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf***REMOVED*** from 'angular2/common';
import {IonicApp, Page, NavController, Popup***REMOVED*** from 'ionic-angular';
import {UserService***REMOVED*** from '../../db/service/user';

@Page({
  templateUrl: 'build/auth/templates/forgot-password.html'
***REMOVED***)
export class PasswordResetPage {
  userService: UserService;
  popup: Popup;
  nav: any;
  form: any;

  constructor(app: IonicApp, nav: NavController, userService: UserService, popup: Popup) {
    this.userService = userService;
    this.popup = popup;
    this.nav = nav;
    this.form = new ControlGroup({
      email: new Control('', Validators.required),
  ***REMOVED***);
***REMOVED***

  resetPassword(event) {
    let self = this;
    event.preventDefault();
    this.userService.resetPassword(this.form.value.email).then(() => {
      self.doAlert(`${self.form.value.email***REMOVED*** wurde das Passwort zurückgesetzt`, 'Erfolgreich', 'blue').then(() => {
        self.nav.pop()
    ***REMOVED***);
  ***REMOVED***).catch((error) => {
***REMOVED***
        switch (error.code) {
          case "INVALID_USER":
            self.doAlert("The specified user account does not exist.");
            break;
          default:
            self.doAlert(error.message, "Error resetting password");
      ***REMOVED***
    ***REMOVED***
  ***REMOVED***);
***REMOVED***

  doAlert(message: String = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass = 'danger') {
    return this.popup.alert({
      title: title,
      template: message,
      cssClass: cssClass
  ***REMOVED***);
***REMOVED***
***REMOVED***