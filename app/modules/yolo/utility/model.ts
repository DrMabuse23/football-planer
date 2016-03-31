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

  constructor(model:any, map: boolean = false) {
    Object.assign(this, model);
    Object.keys(model).forEach(attr => {
      this._map.set(attr, this[attr]);
    });
  }

  get attributes():string[] {
    return Object.keys(this._map);
  }
  /**
   * public the map
   */
  get map(): any {
    return this._map;
  }
}

module Model { };
export {Model as ModelTemp};
