import {Validators} from 'angular2/common';
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
*  ```js
* class foo extends Yolo.Model {
*  constructor(){
*    super({email:'', password: ''});
*    this.rules = {
*      email: [Validators.required],
*      password: [Validators.required]
*    };
*  }
* }
* let bar = new foo();
* bar.set('email', 'a@b.c');
* bar.get('email');
* bar.apply({email: 'my@you.us', 'password': 'secret', whooza: 'test'});
* console.log(bar.values());
* // {email: 'my@you.us', 'password': 'secret'}
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


  constructor(model: any) {
    this._create(model);
    this.init();
  }

  init() {
    this.attributes.forEach(attr => {
      this[`${attr}`] = this._map.get(attr);
    });
  }
  /**
   * add attributes
   */
  private _create(model: any) {
    Object.assign(this, model);
    Object.keys(model).forEach(attr => {
      this._map.set(attr, model[attr]);
      this._attributes.push(attr);
    });
  }
  /**
   * return an Array of string with the model attributes
   */
  public get attributes(): string[] {
    return this._attributes;
  }
  /**
   * apply a Model Structure
   */
  public apply(v: Object) {
    this.attributes.forEach(attr => {
      if (v[attr] && this.attributes.indexOf(attr) !== -1) {
        console.log(`set ${attr} with ${v[attr]}`);
        this.set(attr, v[attr]);
      } else {
        console.log(`${attr} not exist on this model`);
      }
    }, (this));
  }

  /**
   * get a attr from Model
   */
  public get(attr: string) {
    return this[attr];
  }

  /**
   * set a attr to Model
   */
  public set(attrName: string, attrValue: any) {
    this[attrName] = attrValue;
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
   * return a array of Validator Rules
   * @link https://angular.io/docs/ts/latest/api/common/Validators-class.html
   */
  public get rules(): Object {
    return this._rules;
  }

  /**
   * set a Object of Validator Rules
   * @link https://angular.io/docs/ts/latest/api/common/Validators-class.html
   * ```js
   * this.rules = {
      email: [Validators.required],
      password: [Validators.required]
    };
    ````
   */
  public set rules(v: Object) {
    this._rules = v;
  }
}

module Model { };
export {Model as ModelTemp};
