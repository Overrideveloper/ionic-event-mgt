import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the GuestDetailsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-guest-details',
  templateUrl: 'guest-details.html',
})
export class GuestDetailsPage {
  public eventId:string;
  public guestId:string;
  public currentGuest:any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventProvider: EventProvider) {
  }

  ionViewDidLoad() {
    this.eventId = this.navParams.get('eventId');
    this.guestId = this.navParams.get('guestId');
    this.eventProvider.guestDetails(this.eventId, this.guestId)
      .on('value', guestSnapshot => {
        this.currentGuest = guestSnapshot.val();
      });
  }

}
