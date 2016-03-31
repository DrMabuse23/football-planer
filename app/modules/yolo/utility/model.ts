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
  private _attributes : string[] = [];

  constructor(model:any) {
    this._create(model);
***REMOVED***

  init() {
    this.attributes.forEach(attr => {
      this[`${attr***REMOVED***`] = this.map.get(attr);
  ***REMOVED***);
***REMOVED***

  private _create(model: any) {
    Object.assign(this, model);
    Object.keys(model).forEach(attr => {
      this._map.set(attr, model[attr])
      this._attributes.push(attr);
  ***REMOVED***);
***REMOVED***

  public get attributes(): string[] {
    return this._attributes;
***REMOVED***
  /**
   * public the map
   */
  public get map(): any {
    return this._map;
***REMOVED***

***REMOVED***

module Model { ***REMOVED***;
export {Model as ModelTemp***REMOVED***;
