import {ControlGroup, Control} from 'angular2/common';

class Validators {

  static email(control: Control) {
    let valid = false;
    let re = /[a-z0-9!#$%&'*+=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (control && control.value) {
      if (re.test(control.value)) {
        valid = true;
      }
    }
    if (valid) {
      return null;
    }
    return {
      email: true
    };
  }

  static phone (control: Control) {
    let valid = false;
    let re = /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/gm;
    if (control && control.value) {
      if (re.test(control.value) && Number(control.value) !== NaN) {
        valid = true;
      }
    }
    if (valid) {
      return null;
    }
    return {
      phone: true
    };
  }

  static equal (group: ControlGroup) {
    let val;
    let valid = true;
    for (name in group.controls) {
      if (val === undefined) {
        val = group.controls[name].value
      } else {
        if (val !== group.controls[name].value) {
          valid = false;
          break;
        }
      }
    }
    if (valid) {
      return null;
    }
    return {
      equal: true
    };
  }
}
module Validators { };
export {Validators as ValidatorsTemp};
