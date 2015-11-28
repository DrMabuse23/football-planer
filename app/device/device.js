import {Page, Item, ItemGroup, ItemGroupTitle, ItemSliding, List, ListHeader***REMOVED*** from 'ionic/ionic';
@Page({
  directives: [Item, ItemGroup, ItemGroupTitle, ItemSliding, List, ListHeader],
  templateUrl: 'device/device.html'
***REMOVED***)
export class DevicePage {
***REMOVED***
    this.info = `Device info on device`;
    this.deviceInfo = {
      platform: window.cordova ? window.device.platform : 'Browser'
  ***REMOVED***;
***REMOVED***
***REMOVED***
