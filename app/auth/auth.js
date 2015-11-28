import {Page, Item, ItemGroup, ItemGroupTitle, ItemSliding, List, ListHeader, NavController} from 'ionic/ionic';
import Login from './login';

@Page({
  directives: [Item, ItemGroup, ItemGroupTitle, ItemSliding, List, ListHeader],
  templateUrl: 'auth/auth.html'
})
export class AuthPage {
  constructor() {
    console.log('auth');
  }
}
