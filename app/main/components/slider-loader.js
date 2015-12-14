import {Component, NgIf***REMOVED*** from 'angular2/core';
@Component({
  selector: 'slider-loader',
  template: `
  <div class="relative">
    <div class="slider-loader">
      <div class="line"></div>
      <div class="break dot1"></div>
      <div class="break dot2"></div>
      <div class="break dot3"></div>
    </div>
  </div>
  `,
  properties: ['showing'],
***REMOVED***)
export class SliderLoader{
  showing: boolean;
***REMOVED***