import {Component} from 'angular2/core';
/**
 * example Loader component shows an animated loader
 * ```html
 *  <circle-loader [hidden]="true"></circle-loader>
 * ````
 */
@Component({
  selector: 'circle-loader',
  template: `
  <figure>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </figure>` // makes all Ionic directives available to your component
})
export class CircleLoader {}
