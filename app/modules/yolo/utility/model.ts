interface ModelInterface {
  /**
   * returns a an Array from the model attributes
   */
  attributes: string[];
  /**
   * @link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map
   */
  map: any;
}

class Model implements ModelInterface {
  private _map: any = new Map();
  private _attributes : string[] = [];

  constructor(model:any) {
    this._create(model);
  }

  init() {
    this.attributes.forEach(attr => {
      this[`${attr}`] = this.map.get(attr);
    });
  }

  private _create(model: any) {
    Object.assign(this, model);
    Object.keys(model).forEach(attr => {
      this._map.set(attr, model[attr])
      this._attributes.push(attr);
    });
  }

  public get attributes(): string[] {
    return this._attributes;
  }
  /**
   * public the map
   */
  public get map(): any {
    return this._map;
  }

}

module Model { };
export {Model as ModelTemp};
