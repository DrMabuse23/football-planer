import {Validators, ControlGroup, Control} from 'angular2/common';
interface ModelInterface {
  /**
   * returns a an Array from the model attributes
   */
  attributes: string[];
  /**
   * Validate the Model
   */
  rules: Object;
}

/**
* @class Model
*  ````js
* class foo extends Yolo.Model {
*  constructor(){
*    super({email:'', password: ''});
*    this.rules = {
*      email: [Validators.required],
*      password: [Validators.required]
*    };
*   this.init();
*  }
* }
* ```
*
*/
class Model implements ModelInterface {
  /**
   * @link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map
   */
  private _map: any = new Map();
  /**
   * return a Array of model keys
   */
  private _attributes: string[] = [];
  private _rules: Object;
  private _form: ControlGroup;
  private _controlGroup: ControlGroup;

  constructor(model: any) {
    this._create(model);
  }

  init() {
    this.attributes.forEach(attr => {
      this[`${attr}`] = this._map.get(attr);
    });
    this.controlGroup = this._prepareRules();
  }

  private _create(model: any) {
    Object.assign(this, model);
    Object.keys(model).forEach(attr => {
      this._map.set(attr, model[attr])
      this._attributes.push(attr);
    });
  }

  private _prepareRules(): ControlGroup {
    let temp: any = {};
    let self = this;
    this.attributes.forEach((attr) => {
      if (self.rules[attr]) {
        temp[attr] = new Control(self[attr], Validators.compose(self.rules[attr]));
      } else {
        temp[attr] = new Control(self[attr]);
      }
    });
    return new ControlGroup(temp);
  }

  public pristine() {
    return this.controlGroup.pristine;
  }

  public get attributes(): string[] {
    return this._attributes;
  }
  /**
   * apply a Model Structure
   */
  public apply(v: any) {
    this.attributes.forEach(attr => {
      if (v[attr] && this.attributes.indexOf(attr)) {
        this[`${attr}`] = v[attr];
      }
    });
  }

  /**
   * get a attr from Model
   */
  public get(attr: string) {
    return this._map.get(attr);
  }

  /**
   * set a attr to Model
   */
  public set(attrName: string, attrValue: any) {
    this._map.set(attrValue);
  }


  /**
   * clean the model
   */
  public clear() {
    this._map.clear();
  }
  /**
   * entries
   */
  public values() {
    let temp = {};
    this.attributes.forEach(attr => {
      temp[`${attr}`] = this[attr];
    });
    return temp;
  }
  /**
   * delete a attr from the model by attr name after the this attribute returns undefined
   */
  public unsetAttribute(attrName: string): any {
    if (this._map.has(attrName)) {
      this._map.delete(attrName);
    }
    return this._map.has(attrName);
  }
  /**
   * @link AbstractControl angular2/src/common/AbstractControl
   * @link https://angular.io/docs/ts/latest/api/common/AbstractControl-class.html
   */
  public validate(form: ControlGroup) {
    return form.valid;
  }
  /**
   * return a array of Validator Rules
   * @link https://angular.io/docs/ts/latest/api/common/Validators-class.html
   */
  public get rules(): Object {
    return this._rules;
  }

  /**
   * set a Object of Validator Rules
   * @link https://angular.io/docs/ts/latest/api/common/Validators-class.html
   * ````js
   * this.rules = {
      email: [Validators.required],
      password: [Validators.required]
    };
    ````
   */
  public set rules(v: Object) {
    this._rules = v;
  }

  /**
   * return a Model form Object which assign the value to the model
   * @link https://angular.io/docs/ts/latest/api/common/ControlGroup-class.html
   */
  public get controlGroup(): ControlGroup {
    return this._controlGroup;
  }
  /**
   * set a Model form Object which assign the value to the model
   * @link https://angular.io/docs/ts/latest/api/common/ControlGroup-class.html
   */
  public set controlGroup(v: ControlGroup) {
    this._controlGroup = v;
  }

}

module Model { };
export {Model as ModelTemp};
