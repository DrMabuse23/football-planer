import {ModelTemp as Model} from './model';

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
}

class ActiveRecord extends Model implements ActiveRecordInterface {
  public form: any;

  constructor(model:any) {
    super(model);
  }

  /**
   * relations
   * return the relations by
   */
  public relations() {
    return [];
  }

  /**
   * beforeSave
   */
  public beforeSave(model: ActiveRecord): boolean {
    return model.validate();
  }

  /**
   * validate
   */
  public validate(): boolean {
    console.log('validate');
    return this.map;
  }

  /**
   * save
   */
  public save(model: ActiveRecord): ActiveRecord {
    console.log('save');
    this.beforeSave(model);
    return model;
  }
}

module ActiveRecord { };
export {ActiveRecord as ActiveRecordTemp};
