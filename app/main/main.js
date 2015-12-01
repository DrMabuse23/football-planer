import {App, IonicApp, Config} from 'ionic/ionic';
import {LoginPage} from './../auth/page/login';
import {DBService} from './../db/service/db';
import './main.scss';

@App({
  templateUrl: 'main/main.html',
  config: {
    platforms: {
      android: {
        navbarStyle: 'primary',
        tabbarStyle: 'primary'
      }
    },
    backButtonText: '',
  },
  providers: [DBService]
})
class App {
  constructor(app: IonicApp, config: Config, dbService:DBService) {
    this.app = app;
    // retrieve the conference data
    console.log('app', app, config);
    
    this.dbService = dbService;
    this.isMD = config.get('mode') == 'md' ? '' : null;
    this.pages = [
      { title: 'Login', component: LoginPage, icon: 'log-in', db: this.dbService }
    ];
    this.root = LoginPage;
    this.dbService.getConfig().then((res) =>{
      this.dbService.auth();
    }).catch(err => console.error(err));
  }
  
}
