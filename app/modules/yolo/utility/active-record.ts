import {ModelTemp as Model***REMOVED*** from './model';

interface ActiveRecordInterface {
  /**
   * beforeSave its called when the save will be triggered
   */
  beforeSave(model: ActiveRecord);
  /**
   * save the model into your Firebase
   */
  save(model: ActiveRecord);
  /**
   * validate
   */
  validate();
  /**
   * return <Array>;
   */
  relations?();
***REMOVED***

class ActiveRecord extends Model implements ActiveRecordInterface {
  public form: any;

  constructor(model:any) {
    super(model);
***REMOVED***

  /**
   * relations
   * return the relations by
   */
  public relations() {
    return [];
***REMOVED***

  /**
   * beforeSave
   */
  public beforeSave(model: ActiveRecord): boolean {
    return model.validate();
***REMOVED***

  /**
   * validate
   */
  public validate(): boolean {
    console.log('validate');
    return this.map;
***REMOVED***

  /**
   * save
   */
  public save(model: ActiveRecord): ActiveRecord {
    console.log('save');
    this.beforeSave(model);
    return model;
***REMOVED***
***REMOVED***

module ActiveRecord { ***REMOVED***;
export {ActiveRecord as ActiveRecordTemp***REMOVED***;
