import { Component } from '@angular/core';
import { IonicPage, NavController, ActionSheet, ActionSheetController, Alert, AlertController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the EventListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-list',
  templateUrl: 'event-list.html',
})
export class EventListPage {
  public eventList: Array<any>;
  constructor(public navCtrl: NavController, public eventProvider: EventProvider,
    public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    this.eventProvider.listEvent().on('value', eventListSnapshot => {
      this.eventList = [];
      eventListSnapshot.forEach( snap => {
        this.eventList.push({
          id: snap.key,
          name: snap.val().name,
          price: snap.val().price,
          date: snap.val().date
        });
        return false;
      });
    });
  }

  showOptions(eventId):void{
    let options:ActionSheet = this.actionSheetCtrl.create({
      title: 'What do you want to do?',
      buttons: [
        {
          text: 'Edit Event',
          handler: () => {
            this.navCtrl.push('EventEditPage', { 'eventId': eventId });
          }
        },
        {
          text: 'Delete Event',
          handler: () => {
            let alert:Alert = this.alertCtrl.create({
              message: 'Delete this event?',
              buttons:[
                {
                  text: 'Cancel',
                  role: 'cancel'
                },
                {
                  text: 'Delete',
                  handler: () => {
                    this.eventProvider.deleteEvent(eventId).then( () => {
                      this.navCtrl.setRoot(EventListPage);
                    });
                  }
                }
              ]
            });
            alert.present();
          }
        },
        {
          text: 'Event Details',
          handler: () => { this.navCtrl.push('EventDetailPage', { 'eventId': eventId }); }
        }
      ]
    });
    options.present();
  }

  goToCreate():void{
    this.navCtrl.push('EventCreatePage');
  }
}
