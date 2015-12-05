import {Injectable} from 'angular2/angular2';
import {DBService} from './../../db/service/db';

@Injectable()
export class UserService {
  user: any = {
    email: null,
    password: null
  };
  profile: any = {
    firstName: null,
    lastName: null,
    mobile: null,
    createdAt: null,
    updatedAt: null,
    userUUid: null
  };
  dbService: DBService;

  constructor(dbService: DBService) {
    this.dbService = dbService;
  }
  
  mapUser(form) {
    console.log(form);
    this.user.email = form.value.email;
    this.user.password = CryptoJS.HmacSHA256(form.value.matchingPassword.password, this.dbService.cfg.token).toString();
    this.profile.firstName = form.value.firstName;
    this.profile.lastName = form.value.lastName;
    this.profile.mobile = form.value.mobile;
    this.profile.createdAt = this.profile.updatedAt = new Date().getTime(); 
  }
  registerUser(form) {
    this.mapUser(form);
    console.log(this.user, this.profile, CryptoJS);
    return this.createUser();
  }
  
  createUser(){
    var self = this;
    return new Promise((resolve, reject) => {
      this.dbService.db.createUser({
        email: this.user.email,
        password: this.user.password
      }, function(error, userData) {
        if (error) {
          switch (error.code) {
            case "EMAIL_TAKEN":
              console.log("The new user account cannot be created because the email is already in use.");
              break;
            case "INVALID_EMAIL":
              console.log("The specified email is not a valid email.");
              break;
            default:
              console.log("Error creating user:", error);
          }
          return reject(error);
        } else {
          
          console.log("Successfully created user account with uid:", userData);
          return self.createProfile(userData.uid, self);
        }
      })
    });
  }

  createProfile(uuid, self) {
    self.profile.userUUid = uuid;
    var profileRef = self.dbService.db.child("playerProfiles");
    return new Promise((resolve, reject) => {
      profileRef.push(self.profile, (err, profile) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      });  
    });
  }
}