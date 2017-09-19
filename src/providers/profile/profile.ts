import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the ProfileProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/
@Injectable()
export class ProfileProvider {
  public userProfile:firebase.database.Reference;
  public currentUser:firebase.User;

  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.currentUser = user;
        this.userProfile = firebase.database().ref(`/userProfile/${user.uid}`);
      }
    });
  }

  getUserProfile(): firebase.database.Reference{
    return this.userProfile;
  }

  updateName(firstName:string, lastName:string):firebase.Promise<any>{
    return this.userProfile.update({ firstName, lastName });
  }

  updateDatabase(birthDate:string):firebase.Promise<any>{
    return this.userProfile.update({ birthDate });
  }

  updateEmail(newEmail:string, password:string):firebase.Promise<any>{
    const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, password);
    return this.currentUser.reauthenticateWithCredential(credential).then( user => {
      this.currentUser.updateEmail(newEmail).then( user => {
        this.userProfile.update({ email:newEmail });
      });
    }).catch( error => {
      console.error(error);
    });
  }

  updatePassword(newPassword:string, oldPassword:string):firebase.Promise<any>{
    const credential = firebase.auth.EmailAuthProvider.credential(this.currentUser.email, oldPassword);
    return this.currentUser.reauthenticateWithCredential(credential).then( user => {
      this.currentUser.updatePassword(newPassword).then( user => {
        console.log("Password changed");
      });
    }).catch( error => {
      console.error(error)
    });
  }
}