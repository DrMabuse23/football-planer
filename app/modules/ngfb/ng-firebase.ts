import {FireBaseRecordTemp} from './firebase-record';
import {LoginServiceTemp} from './login-serv';
import {DBServiceTemp} from './db';

export namespace NgFirebase {
  export import FireBaseRecord  = FireBaseRecordTemp;
  export import LoginService    = LoginServiceTemp;
  export import DBService       = DBServiceTemp;
}
