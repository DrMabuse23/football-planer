import {Validators, Control, ControlGroup, FormBuilder} from 'angular2/angular2';
import {isBlank} from 'angular2/src/facade/lang';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {LoginPage} from './../../auth/page/login';
import {DBService} from './../../db/service/db';
class SignUpValidator {

  static confirm(firstValue, secondValue) {
    if (isBlank(firstValue) || isBlank(secondValue)) {
      return null;
    }
    if (firstValue !== secondValue) {
      return null;
    }
    return true;
  }
  static isEmail(control: Object) {
    if (control && control.value) {
      let re = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      //console.log('isEmail', re.test(control.value))
      return { 'isEmail': re.test(control.value) };  
    }
  }
  static isPhoneNumber(control: Object) {
    console.log(typeof control.value);
    if (control && control.value) {
      let re = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
      console.log('isPhoneNumber', re.test(Number(control.value)))
      if (re.test(Number(control.value))) {
        return null;
      }
      return { 'isPhoneNumber': true };  
    }
  }
}
@Page({
  templateUrl: './../../auth/templates/signup.html'
})
export class SignupPage {
  form: ControlGroup
  constructor(app: IonicApp, nav: NavController, dbService: DBService, fb:FormBuilder) {
    this.dbService = dbService;
    this.app = app;
    this.form = fb.group({
      matchingPassword: fb.group({
        password: ['test1234', Validators.required],
        passwordConfirm: ['test12345', Validators.required]
      }, {validator: this.areEqual}),
      email: new Control('horst@posteo.de', Validators.compose([Validators.required])),
      firstName: new Control('Horst', Validators.required),
      lastName: new Control('Hugo', Validators.required),
      mobile: new Control('017647343520', Validators.compose([Validators.required]))
    });
    this.signupData = {};
    this.loginPage = LoginPage;
  }
  
  areEqual(group: ControlGroup) {
    let val;
    let valid = true;
    
    for (name in group.controls) {
      console.log(name);
      if (val === undefined) {
        val = group.controls[name].value
      } else {
        if (val !== group.controls[name].value) {
          valid = false;
          break;
        }
      }
    }
    console.log(valid);
    if (valid) {
      return null;
    }

    return {
      areEqual: true
    };
  }
  
  doSignup(event) {
    console.log('Doing login', this.form);
    if (this.form.valid) {
      //this.registerUser();
    } else {
      console.log('error', this.form.controls.mobile);
    }
    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
  }

  registerUser() {
    return new Promise((resolve, reject) => {
      this.dbService.db.createUser({
        email: this.form.value.email,
        password: this.form.value.password
      }, function (error, userData) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
          }
          return reject(error);
        } else {
          console.log("Successfully created user account with uid:", );
          return resolve(userData.uid);
        }
      })
    });
  }
}