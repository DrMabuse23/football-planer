import {Component, OnInit} from 'angular2/angular2';
import {Config, Icon, Item, ItemSliding, List, ListHeader, NavController, Popup} from 'ionic/ionic';
@Component({
  selector: 'Login',
  templateUrl: 'auth/login.html'
})
export class Login {
  constructor() {
    console.log('loginC');  
  }
}