import { Component } from '@angular/core';
import { IonicPage, NavController, Alert, AlertController, App } from 'ionic-angular';
import { ProfileProvider } from '../../providers/profile/profile';
import { AuthProvider } from '../../providers/auth/auth';
/**
 * Generated class for the ProfilePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  public userProfile:any;
  public birthDate:any;
  constructor(public navCtrl: NavController, public alertCtrl: AlertController,
    public profileProvider: ProfileProvider, public authProvider: AuthProvider, public app: App) {}
  
  ionViewDidLoad(){
    this.profileProvider.getUserProfile().on( 'value', userProfileSnapshot => {
      this.userProfile = userProfileSnapshot.val();
      this.birthDate = userProfileSnapshot.val().birthDate;
    });
  }

  logOut():void{
    this.authProvider.logoutUser().then( () => {
      this.app.getRootNav().setRoot('LoginPage');
    });
  }

  updateName():void{
    const alert:Alert = this.alertCtrl.create({
      message: 'Edit name',
      inputs: [
        {
          name: 'firstName',
          placeholder: 'Enter first name',
          value: this.userProfile.firstName
        },
        {
          name: 'lastName',
          placeholder: 'Enter last name',
          value: this.userProfile.lastName
        },
      ],
      buttons: [
        { text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateName(data.firstName, data.lastName);
          }
        }
      ]
    });
    alert.present();
  }

  updateDOB(birthDate:string):void{
    this.profileProvider.updateDOB(birthDate);
  }

  updateEmail():void{
    let alert:Alert = this.alertCtrl.create({
      message: 'Change email',
      inputs: [
        {
          name: 'newEmail',
          placeholder: 'Enter new email'
        },
        {
          name: 'password',
          placeholder: 'Enter password',
          type: 'password'
        },
      ],
      buttons: [
        { text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updateEmail(data.newEmail, data.password).then( () => {
              console.log("Email changed successfuly");
            }).catch( error => {
              console.log(`Error: ${error.message}`)
            });
          }
        }
      ]
    });
    alert.present();
  }

  updatePassword():void{
    let alert:Alert = this.alertCtrl.create({
      message: 'Change password',
      inputs:[
        {
          name: 'oldPassword',
          placeholder: 'Enter old password',
          type: 'password'
        },
        {
          name: 'newPassword',
          placeholder: 'Enter new password',
          type: 'password'
        },
      ],
      buttons:[
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
            this.profileProvider.updatePassword(data.newPassword, data.oldPassword);
          }
        }
      ]
    });
    alert.present();
  }
}