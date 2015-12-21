import {NgFor} from 'angular2/core';
import {IonicApp, Page, NavController} from 'ionic/ionic';
import {UserService} from '../../db/service/user';
import {DBService} from '../../db/service/db';
import {LoginPage} from './../../auth/page/login';
import {EventsPage} from '../../events/page/events-page';
@Page({
  templateUrl: 'home/templates/index.html'
})
export class HomePage {
  app: IonicApp;
  pages: any;
  root: any;
  userService: UserService;
  dbService: DBService;
  loginPage: any;
  constructor(app: IonicApp, nav: NavController, userService: UserService, dbService:DBService) {
    this.app = app;
    this.root = EventsPage;
    this.dbService = dbService;
    this.loginPage = LoginPage;
    this.pages = [
      { title: 'Events', component: EventsPage, icon: 'calendar' },
    ];
    this.userService = userService;
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    let nav = this.app.getComponent('nav');
    if (page.component === this.root) {
      return this.app.getComponent('leftMenu').close();
    }

    nav.setRoot(page.component).then(() => {
      // wait for the root page to be completely loaded
      // then close the menu
      this.app.getComponent('leftMenu').close();
    });
  }

  logout() {

    this.dbService.unauth();
    let nav = this.app.getComponent('nav');
    this.app.getComponent('leftMenu').close();
    nav.setRoot(this.loginPage);
  }
}