import {Validators} from 'angular2/common';
import {Injectable} from 'angular2/core';
import {Yolo} from './../../yolo/yolo';

class LoginForm extends Yolo.Form {
  constructor(model: Yolo.Model) {
    super(model);
  }
}

module LoginForm { };
export {LoginForm as LoginFormTemp};
