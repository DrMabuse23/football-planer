import {App, IonicApp, Config***REMOVED*** from 'ionic/ionic';
import {LoginPage***REMOVED*** from './../auth/login';
import './main.scss';

@App({
  templateUrl: 'main/main.html',
  config: {
    platforms: {
      android: {
        navbarStyle: 'primary',
        tabbarStyle: 'primary'
    ***REMOVED***
  ***REMOVED***,
    backButtonText: '',
***REMOVED***
***REMOVED***)

class App {
  constructor(app: IonicApp, config: Config) {
    this.app = app;
    // retrieve the conference data
    console.log('app', app, config);
    this.root = LoginPage;
    this.isMD = config.get('mode') == 'md' ? '' : null;

    this.pages = [
      { title: 'Login', component: LoginPage, icon: 'log-in' ***REMOVED***
    ];
***REMOVED***
***REMOVED***
