import {ModelTemp} from './utility/model';
import {ActiveRecordTemp} from './utility/active-record';

export namespace Yolo {
  /**
   * a Simple Model
   */
  export import Model = ModelTemp;
  /**
   * a Model who can be crud actions
   */
  export import ActiveRecord = ActiveRecordTemp;
}

// let Yolo = {
//   Model: ModelTemp,
//   ActiveRecord: ActiveRecordTemp
// };

// export {
//   Yolo
// }
