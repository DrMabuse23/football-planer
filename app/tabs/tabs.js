import {NavController, Page***REMOVED*** from 'ionic/ionic';
import {AboutPage***REMOVED*** from '../about/about';
import {DevicePage***REMOVED*** from '../device/device';

@Page({
  templateUrl: 'tabs/tabs.html'
***REMOVED***)
export class TabsPage {
  constructor(nav: NavController) {
    this.tab1Root = AboutPage;
    this.tab2Root = DevicePage;
***REMOVED***
***REMOVED***
