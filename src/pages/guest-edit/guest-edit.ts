import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController, ActionSheet, ActionSheetController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the GuestEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-edit',
  templateUrl: 'guest-edit.html',
})
export class GuestEditPage {
  public currentGuest:any;
  public eventId: string;
  public guestId: string;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventProvider: EventProvider, public alertCtrl: AlertController,
    public camera: Camera, public actionSheetCtrl: ActionSheetController ) {
  }

  ionViewDidLoad() {
    this.eventId = this.navParams.get('eventId');
    this.guestId = this.navParams.get('guestId');
    this.eventProvider.guestDetails(this.eventId, this.guestId)
      .on('value', guestSnapshot => {
        this.currentGuest = guestSnapshot.val();
      });
  }

  updateName():void{
    let alert:Alert = this.alertCtrl.create({
      message: 'Edit name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter name',
          value: this.currentGuest.name
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Save',
          handler: data => {
            this.eventProvider.updateGuestName(this.eventId, this.guestId, data.name);
          }
        }
      ]
    });
    alert.present();
  }

  takePicture():void{
    this.camera.getPicture({
      quality : 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.eventProvider.updateGuestImage(this.eventId, this.guestId, imageData);
    }, error =>{
      console.log("ERROR: " + JSON.stringify(error));
    });
  }

  selectPicture():void{
    this.camera.getPicture({
      quality : 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: this.camera.EncodingType.PNG,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.eventProvider.updateGuestImage(this.eventId, this.guestId, imageData);
    }, error =>{
      console.log("ERROR: " + JSON.stringify(error));
    });
  }

  imageOptions():void{
    let sheet:ActionSheet = this.actionSheetCtrl.create({
      buttons:[
        {
          text: 'Use Camera',
          handler: () => {
            this.takePicture();
          }
        },
        {
          text: 'Select from Gallery',
          handler: () => {
            this.selectPicture();
          }
        }
      ]
    });
    sheet.present();
  }
}
