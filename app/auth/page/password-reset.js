import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf} from 'angular2/common';
import {IonicApp, Page, NavController, Popup} from 'ionic/ionic';
import {UserService} from '../../db/service/user';

@Page({
  templateUrl: 'auth/templates/forgot-password.html'
})
export class PasswordResetPage {
  constructor(app: IonicApp, nav: NavController, userService: UserService, popup: Popup) {
    this.userService = userService;
    this.popup = popup;
    this.nav = nav;
    this.form = new ControlGroup({
      email: new Control('', Validators.required),
    });
  }

  resetPassword(event) {
    let self = this;
    event.preventDefault();
    this.userService.resetPassword(this.form.value.email).then(() => {
      self.doAlert(`${self.form.value.email} wurde das Passwort zurückgesetzt`, 'Erfolgreich', 'blue').then(() => {
        self.nav.pop()
      });
    }).catch((error) => {
      if (error) {
        switch (error.code) {
          case "INVALID_USER":
            self.doAlert("The specified user account does not exist.");
            break;
          default:
            self.doAlert(error.message, "Error resetting password");
        }
      }
    });
  }

  doAlert(message: String = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass = 'danger') {
    return this.popup.alert({
      title: title,
      template: message,
      cssClass: cssClass
    });
  }
}