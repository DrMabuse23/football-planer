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
  private _attributes: string[];

  constructor(model:any, map: boolean = false) {
    Object.assign(this, model);
    this.attributes = Object.keys(model);
***REMOVED***

  public get attributes():string[] {
    return this._attributes;
***REMOVED***

  public set attributes(attrs: string[]) {
    this._attributes = attrs;
***REMOVED***
  /**
   * public the map
   */
  public get map(): any {
    return this._map;
***REMOVED***

  /**
   * set the map
   */
  public set map(model: any) {
    Object.keys(model).forEach(attr => {
      this._map.set(attr, this[attr]);
  ***REMOVED***);
***REMOVED***
***REMOVED***

module Model { ***REMOVED***;
export {Model as ModelTemp***REMOVED***;
