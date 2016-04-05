import {Validators, ControlGroup, Control} from 'angular2/common';
interface ModelInterface {
  /**
   * returns a an Array from the model attributes
   */
  attributes: string[];
  /**
   * @link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map
   */
  map: any;
  /**
   * Validate the Model
   */
  rules: Object;
}

class Model implements ModelInterface {
  private _map: any = new Map();
  private _attributes : string[] = [];
  private _rules : Object;
  private _form : ControlGroup;
  private _controlGroup: ControlGroup;

  constructor(model:any) {
    this._create(model);
  }

  init() {
    this.attributes.forEach(attr => {
      this[`${attr}`] = this.map.get(attr);
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

  private _prepareRules(): ControlGroup{
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

  public get rules() : Object {
    return this._rules;
  }
  /**
   * public the map
   */
  public get map(): any {
    return this._map;
  }

  public clear() {
    this.map.clear();
  }

  public entries() : string[] {
    return this.map.entries();
  }

  public unsetAttribute(attrName: string): any {
    if (this.map.has(attrName)) {
      this.map.delete(attrName);
    }
    return this.map.has(attrName);
  }
  /**
   * @link AbstractControl angular2/src/common/AbstractControl
   */
  public validate(form: ControlGroup){
    return form.valid;
  }

  public set rules(v : Object) {
    this._rules = v;
  }

  public get controlGroup() : ControlGroup {
    return this._controlGroup;
  }

  public set controlGroup(v:ControlGroup) {
    this._controlGroup = v;
  }

}

module Model { };
export {Model as ModelTemp};
