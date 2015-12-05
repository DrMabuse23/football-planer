import {Validators, Control, ControlGroup, FormBuilder} from 'angular2/angular2';
import {isBlank} from 'angular2/src/facade/lang';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {LoginPage} from './../../auth/page/login';
import {DBService} from '../../db/service/db';
import {UserService} from '../../db/service/user';


@Page({
  templateUrl: './../../auth/templates/signup.html'
})
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
      }, {validator: this.areEqual}),
      email: new Control('horst@posteo.de', Validators.compose([Validators.required])),
      firstName: new Control('Horst', Validators.required),
      lastName: new Control('Hugo', Validators.required),
      mobile: new Control('017647343520', Validators.compose([Validators.required, this.isPhoneNumber]))
    });
    this.signupData = {};
    this.loginPage = LoginPage;
    console.log(this.dbService);
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
    console.log('Doing login', this.form);
    if (this.form.valid) {
      this.userService.registerUser(this.form).then(() => {
        console.log('user added');
      }).catch(err => console.error(err));
    } else {
      console.log('error', this.form.controls.mobile);
    }
    // Don't allow the form to submit normally, since we
    // will handle it ourselves
    event.preventDefault();
  }
}