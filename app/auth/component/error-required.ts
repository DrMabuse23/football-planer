import {Component} from 'angular2/core';

@Component({
  selector: 'error-required',
  template: `
  <ion-item danger *ngIf="interface.expr">
    <p danger>{{interface.attr}} ist ein pflicht feld und darf nicht leer sein.</p>
  </ion-item>`
})

export class ErrorItemComponent {
  public interface: ErrorItemInterface;
  constructor () {
    console.log('nope');
    //debugger;
  }
}

export interface ErrorItemInterface {
  expr: any;
  attr: string;
}
