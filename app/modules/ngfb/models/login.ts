import {Validators} from 'angular2/common';
import {Injectable} from 'angular2/core';
import {Yolo} from './../../yolo/yolo';

class LoginModel extends Yolo.Model {
  constructor() {
    super({ email: '', password: '', remember: true });
    this.rules = {
      email: [Validators.required, Yolo.Validators.email],
      password: [Validators.required]
    };
  }
}

module LoginModel { };
export {LoginModel as LoginModelTemp};
