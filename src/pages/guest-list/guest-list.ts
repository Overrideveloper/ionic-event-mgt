import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheet, ActionSheetController, Alert, AlertController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';
/**
 * Generated class for the GuestListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-list',
  templateUrl: 'guest-list.html',
})
export class GuestListPage {
  public guestList: Array<any>;
  public eventId: string;
  public eventPrice: number;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventProvider: EventProvider, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController ) {
  }

  ionViewDidLoad() {
    this.eventProvider.listGuests(this.navParams.get('eventId'))
      .on('value', guestListSnapshot => {
        this.guestList = [];
        guestListSnapshot.forEach( snap => {
          this.guestList.push({
            id : snap.key,
            name : snap.val().name
          });
          return false;
        });
      });
      this.eventId = this.navParams.get('eventId');
      this.eventPrice = this.navParams.get('eventPrice');
  }

  goToCreate():void{
    this.navCtrl.push('GuestCreatePage', { 'eventId': this.eventId, 'eventPrice': this.eventPrice }); 
  }

  goToOptions(guestId):void{
    let sheet:ActionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Edit guest',
          handler: () => {
            this.navCtrl.push('GuestEditPage', { 'eventId': this.eventId, 'guestId': guestId });
          }
        },
        {
          text: 'Delete guest',
          handler: () => {
            let alert:Alert = this.alertCtrl.create({
              message: 'Delete this guest?',
              buttons: [
                {
                  text: 'Cancel',
                  role: 'cancel'
                },
                {
                  text: 'Delete',
                  handler: () => {
                    this.eventProvider.deleteGuest(this.eventId, guestId);
                  }
                }
              ]
            });
            alert.present();
          }
        },
        {
          text: 'Guest details',
          handler: () => {
            this.navCtrl.push('GuestDetailsPage', { 'eventId': this.eventId, 'guestId': guestId });
          }
        }
      ]
    });
    sheet.present();
  }
}
