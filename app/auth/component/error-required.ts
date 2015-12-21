import {Component***REMOVED*** from 'angular2/core';

@Component({
  selector: 'error-required',
  template: `
  <ion-item danger *ngIf="interface.expr">
    <p danger>{{interface.attr***REMOVED******REMOVED*** ist ein pflicht feld und darf nicht leer sein.</p>
  </ion-item>`
***REMOVED***)

export class ErrorItemComponent {
  public interface: ErrorItemInterface;
***REMOVED***
    console.log('nope');
    //debugger;
***REMOVED***
***REMOVED***

export interface ErrorItemInterface {
  expr: any;
  attr: string;
***REMOVED***