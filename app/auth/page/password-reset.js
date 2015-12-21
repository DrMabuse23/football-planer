import {Component, Validators, Control, ControlGroup, NgClass, Disabled, NgIf} from 'angular2/common';
import {IonicApp, Page, NavController, Popup} from 'ionic/ionic';
import {UserService} from '../../db/service/user';
import {LoginPage} from './../../auth/page/login';

@Page({
  templateUrl: 'auth/templates/forgot-password.html'
})
export class PasswordResetPage {
  constructor(app: IonicApp, nav: NavController, userService: UserService, popup: Popup) {
    this.userService = userService;
    this.popup = popup;
    this.nav = nav;
    this.loginPage = LoginPage;
    this.form = new ControlGroup({
      email: new Control('', Validators.required),
    });
  }

  resetPassword(event) {
    let self = this;
    event.preventDefault();
    this.userService.resetPassword(this.form.value.email).then(() => {
      console.log('Resetting password for user', self.form.value.email);
      self.nav.setRoot(self.loginPage);
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
    this.popup.alert({
      title: title,
      template: message,
      cssClass: cssClass
    }).then(() => {
      console.log('Alert closed');
    });
  }
}