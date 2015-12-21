import {Validators, Control, ControlGroup, FormBuilder} from 'angular2/common';
import {isBlank} from 'angular2/src/facade/lang';
import {IonicApp, Page, NavController, Popup} from 'ionic/ionic';
import {DBService} from '../../db/service/db';
import {UserService} from '../../db/service/user';
import {ErrorItemComponent} from './../component/error-required';

@Page({
  templateUrl: 'auth/templates/signup.html'
})
export class SignupPage {
  app: IonicApp;
  popup: Popup;
  nav: NavController;
  form: any;

  dbService: DBService;
  userService: UserService;
  signupData: any;

  constructor(app: IonicApp, nav: NavController, popup: Popup, dbService: DBService, fb: FormBuilder, userService: UserService) {
    this.dbService = dbService;
    this.userService = userService;
    this.popup = popup;
    this.app = app;
    this.nav = nav;
    this.form = fb.group({
      matchingPassword: fb.group({
        password: ['', Validators.required],
        passwordConfirm: ['', Validators.required]
      }, { validator: this.areEqual }),
      email: new Control('', Validators.compose([Validators.required, this.isEmail])),
      firstName: new Control('', Validators.required),
      lastName: new Control('', Validators.required),
      mobile: new Control('', Validators.compose([Validators.required, this.isPhoneNumber]))
    });
    this.signupData = {};
  }

  areEqual(group: ControlGroup) {
    let val;
    let valid = true;
    for (name in group.controls) {
      if (val === undefined) {
        val = group.controls[name].value
      } else {
        if (val !== group.controls[name].value) {
          valid = false;
          break;
        }
      }
    }
    // debugger;
    if (valid) {
      return null;
    }
    return {
      areEqual: true
    };
  }

  isEmail(control: Control) {
    let valid = false;
    let re = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (control && control.value) {
      if (re.test(control.value)) {
        valid = true;
      }
    }
    if (valid) {
      return null;
    }
    return {
      'isEmail': true
    };
  }

  isPhoneNumber(control: Control) {
    let valid = false;
    let re = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
    if (control && control.value) {
      if (re.test(Number(control.value))) {
        valid = true;
      }
    }
    if (valid) {
      return null;
    }
    return {
      isPhoneNumber: true
    };
  }

  doSignup(event) {
    if (this.form.valid) {
      this.userService.registerUser(this.form).then(() => {
        this.doAlert('Registrierung abgeschlossen', 'Erfolgreich', 'pink').then(() => {
          this.nav.pop();
        });
      }).catch(error => {
        switch (error.code) {
          case "EMAIL_TAKEN":
            this.doAlert('Email ist schon in Benutzung')
            break;
          case "INVALID_EMAIL":
            this.doAlert('Email ist keine valide Email')
            break;
          default:
            this.doAlert(`unbestimmer Fehler beim anlegen dieses Users ${error.message}`);
        }
      });
    } else {
      console.log('error', this.form.controls.mobile);
    }

    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
  }

  doAlert(message: String = 'Ein Fehler ist aufgereten', title = 'Fehler', cssClass='danger') {
    return this.popup.alert({
      title: title,
      template: message,
      cssClass: cssClass
    });
  }
}