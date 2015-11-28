import {App, IonicApp, Config} from 'ionic/ionic';
import {AuthPage} from './../auth/auth';
import './main.scss';

@App({
  templateUrl: 'main/main.html',
  config: {
    platforms: {
      android: {
        navbarStyle: 'primary',
        tabbarStyle: 'primary'
      }
    }
  }
})

class App {
  constructor(app: IonicApp, config: Config) {
    this.app = app;
    // retrieve the conference data
    console.log('app', app, config);
    this.root = AuthPage;
    this.isMD = config.get('mode') == 'md' ? '' : null;

    this.pages = [
      { title: 'Login', component: AuthPage, icon: 'log-in' }
    ];
  }
}
