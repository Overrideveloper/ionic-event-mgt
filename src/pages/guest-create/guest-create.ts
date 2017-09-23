import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

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
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    this.eventKey = this.navParams.get('eventId');
    this.eventPrice = this.navParams.get('eventPrice');
  }

  addGuest(guestName:string):void{
    this.eventProvider.addGuest(this.eventKey, guestName, this.eventPrice)
        .then( newGuest => {
          this.navCtrl.setRoot('GuestListPage', { 'eventId': this.eventKey, 'eventPrice': this.eventPrice });
    });
  }

}
