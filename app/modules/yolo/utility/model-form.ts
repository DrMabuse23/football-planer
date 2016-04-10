import {ModelTemp} from './model';
import {ControlGroup, Control, Validators} from 'angular2/common';
export interface ModelFormInterface {
  model: ModelTemp;
  onChange: boolean;
  form: ControlGroup;
}
/**
* @class ModelForm
* ```js
* class fooForm {
*  constructor(){
*   this.model = new Yolo.Model({email:'', password: ''});
*   this.model.rules = {
*     email: [Validators.required, Yolo.Validators.email],
*     password: [Validators.required]
*   };
*   this.formModel = new Yolo.ModelForm(this.model);
*   console.log(this.formModel.form);
*  }
* }
* ```
*/
class ModelForm implements ModelFormInterface{

  private _model: ModelTemp;
  public form: ControlGroup;
  public onChange: boolean = true;

  constructor(model: ModelTemp) {
    this._model = model;
    this.form = this._getForm();
  }

  private _getForm(): ControlGroup {
    let temp: any = {};

    this.model.attributes.forEach((attr) => {
      if (this.model.rules[attr]) {
        temp[attr] = new Control(this[attr], Validators.compose(this.model.rules[attr]));
      } else {
        temp[attr] = new Control(this[attr]);
      }
    }, (this));
    return new ControlGroup(temp);
  }

  public pristine() {
    return this.form.pristine;
  }

  public apply(v:any) {
    this._model.apply(v);
    this.form = this._getForm();
  }

  public get model() : ModelTemp {
    return this._model;
  }
  /**
   * @link AbstractControl angular2/src/common/AbstractControl
   * @link https://angular.io/docs/ts/latest/api/common/AbstractControl-class.html
   */
  public get valid() {
    return this.form.valid;
  }

  /**
   * return a array of Validator Rules
   * @link https://angular.io/docs/ts/latest/api/common/Validators-class.html
   */
  public get rules(): Object {
    return this.model.rules;
  }
}

module ModelForm { };
export {ModelForm as ModelFormTemp};
