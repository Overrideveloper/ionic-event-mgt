import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the EventDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-detail',
  templateUrl: 'event-detail.html',
})
export class EventDetailPage {
  public currentEvent: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public eventProvider: EventProvider ) {
  }

  ionViewDidLoad() {
    this.eventProvider.eventDetails(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.currentEvent.id = eventSnapshot.key;
      });
  }

  goToGuests():void{
    this.navCtrl.push('GuestListPage', { 'eventId': this.currentEvent.id, 'eventPrice': this.currentEvent.price });
  }
  
}