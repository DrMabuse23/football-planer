import {NgFor} from 'angular2/core';
import {IonicApp, Page, NavController} from 'ionic-angular';
import {UserService} from '../../db/service/user';
import {NgFirebase} from './../../modules/ngfb/ng-firebase';
import {LoginPage} from './../../auth/page/login';
import {EventsPage} from '../../events/page/events-page';
@Page({
  templateUrl: 'build/home/templates/index.html'
})
export class HomePage {
  app: IonicApp;
  pages: any;
  root: any;
  nav: any;
  userService: UserService;
  dbService: NgFirebase.DBService;
  loginPage: any;
  constructor(app: IonicApp, userService: UserService, dbService: NgFirebase.DBService) {
    this.app = app;
    this.root = EventsPage;
    this.dbService = dbService;
    this.loginPage = LoginPage;
    this.nav = this.app.getComponent('nav');
    this.pages = [
      { title: 'Events', component: EventsPage,  attr: 'green-dark', icon: 'calendar' },
    ];
    this.userService = userService;
  }
  closeMenu() {
     return this.app.getComponent('leftMenu').close();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    if (page.component === this.root) {
      return this.closeMenu();
    }

    this.nav.setRoot(page.component).then(() => {
      // wait for the root page to be completely loaded
      // then close the menu
      return this.closeMenu();
    });
  }

  logout() {
    this.dbService.unauth();
    this.app.getComponent('leftMenu').close();
    this.nav.setRoot(this.loginPage);
  }
}
