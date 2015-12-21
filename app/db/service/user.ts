import {Injectable} from 'angular2/core';
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
  userProfile: any;
  dbService: DBService;

  constructor(dbService: DBService) {
    this.dbService = dbService;
  }

  mapUser(form) {
    //console.log(form);
    this.user.email = form.value.email;
    this.user.password = form.value.matchingPassword.password;
    //CryptoJS.HmacSHA256(, this.dbService.cfg.token).toString()
    this.profile.firstName = form.value.firstName;
    this.profile.lastName = form.value.lastName;
    this.profile.mobile = form.value.mobile;
    this.profile.createdAt = this.profile.updatedAt = new Date().getTime();
  }

  registerUser(form) {
    this.mapUser(form);
    // console.log(this.user, this.profile, CryptoJS);
    return this.createUser();
  }

  createUser() {
    var self = this;
    return new Promise((resolve, reject) => {
      this.dbService.db.createUser({
        email: this.user.email,
        password: this.user.password
      }, function(error, userData) {
        if (error) {
          return reject(error);
        } else {
          // console.log("Successfully created user account with uid:", userData);
          return resolve(self.createProfile(userData.uid, self));
        }
      })
    });
  }

  resetPassword(email) {
    console.log(`reset assword for ${email}`);
    return new Promise((resolve, reject) => {
      this.dbService.db.resetPassword({
        email: email
      }, function(err) {
        if (err) {
          console.error(err);
          return reject(err);
        }
        return resolve(true);
      });
    });
  }

  createProfile(uuid, self) {
    self.profile.userUUid = uuid;
    let profileRef = self.dbService.db.child("playerProfiles");
    return new Promise((resolve, reject) => {
      profileRef.push(self.profile, (err, profile) => {
        if (err) {
          return reject(err);
        }
        return resolve(true);
      });
    });
  }

  getUserProfile() {
    let authData = this.dbService.db.getAuth();
    let self = this;
    if (authData) {
      let profileRef = this.dbService.db.child("playerProfiles");
      return new Promise((resolve, reject) => {
        return profileRef.orderByChild("userUUid").equalTo(authData.uid).on("value", (snapshot) => {
          if (typeof snapshot === 'object') {
            snapshot.forEach((data) => {
              self.userProfile = {
                authData: authData,
                profile: data.val()
              }
            });
            return resolve(self.userProfile);
          }
        }, (err) => {
          console.error(err);
          return reject(err);
        });
      })
    }
  }
}