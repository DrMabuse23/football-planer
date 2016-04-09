import {ModelTemp} from './utility/model';
import {ModelFormTemp} from './utility/model-form';
import {ActiveRecordTemp} from './utility/active-record';
import {ValidatorsTemp} from './utility/validators';

export namespace Yolo {
  export import Model = ModelTemp;
  export import Form = ModelFormTemp;
  export import ActiveRecord = ActiveRecordTemp;
  export import Validators  = ValidatorsTemp;
}
