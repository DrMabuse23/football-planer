import {Yolo} from './../yolo/yolo';

interface FirebaseRecordInterface {
  db: any;
}
/**
 * FireBaseRecord
 */
class FireBaseRecord extends Yolo.ActiveRecord implements FirebaseRecordInterface{

  private _db: any;

  constructor(parameters) {
    super(parameters);
  }

  public get db() : any {
    return this._db;
  }

  public set db(v : any) {
    this._db = v;
  }
}

module FireBaseRecord { };
export {FireBaseRecord as FireBaseRecordTemp};
