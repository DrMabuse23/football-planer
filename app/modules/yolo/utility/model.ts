interface ModelInterface {
  /**
   * returns a an Array from the model attributes
   */
  attributes: string[];
  /**
   * @link https://developer.mozilla.org/de/docs/Web/JavaScript/Reference/Global_Objects/Map
   */
  map: any;
***REMOVED***

class Model implements ModelInterface {
  private _map: any = new Map();

  constructor(model:any, map: boolean = false) {
    Object.assign(this, model);
    Object.keys(model).forEach(attr => {
      this._map.set(attr, this[attr]);
  ***REMOVED***);
***REMOVED***

  get attributes():string[] {
    return Object.keys(this._map);
***REMOVED***
  /**
   * public the map
   */
  get map(): any {
    return this._map;
***REMOVED***
***REMOVED***

module Model { ***REMOVED***;
export {Model as ModelTemp***REMOVED***;
