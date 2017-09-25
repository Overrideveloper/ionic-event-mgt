import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
import { Camera } from '@ionic-native/camera';

/**
 * Generated class for the GuestCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-create',
  templateUrl: 'guest-create.html',
})
export class GuestCreatePage {
  public eventKey: string = '';
  public eventPrice: number = 0;
  public guestPicture = null;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventProvider: EventProvider, public camera: Camera, public actionSheetCtrl: ActionSheetController) {
  }

  ionViewDidLoad() {
    this.eventKey = this.navParams.get('eventId');
    this.eventPrice = this.navParams.get('eventPrice');
  }

  addGuest(guestName:string):void{
    this.eventProvider.addGuest(this.eventKey, guestName, this.eventPrice, this.guestPicture)
        .then( newGuest => {
          this.navCtrl.setRoot('GuestListPage', { 'eventId': this.eventKey, 'eventPrice': this.eventPrice });
    });
  }

  takePicture():void{
    this.camera.getPicture({
      quality : 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: true,
      correctOrientation: true,
      targetWidth: 500,   
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.guestPicture = imageData;
    }, error =>{
      console.log("ERROR: " + JSON.stringify(error));
    });
  }

  selectPicture():void{
    this.camera.getPicture({
      quality : 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      correctOrientation: true,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(imageData => {
      this.guestPicture = imageData;
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
