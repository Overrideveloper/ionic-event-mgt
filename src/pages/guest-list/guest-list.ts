import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
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
    public eventProvider: EventProvider ) {
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

}
