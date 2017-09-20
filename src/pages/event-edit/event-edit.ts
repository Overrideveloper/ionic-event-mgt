import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Alert, AlertController } from 'ionic-angular';
import { EventProvider } from '../../providers/event/event';

/**
 * Generated class for the EventEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-edit',
  templateUrl: 'event-edit.html',
})
export class EventEditPage {
  public currentEvent: any;
  public date: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public eventProvider: EventProvider,
    public alertCtrl: AlertController){}

  ionViewDidLoad() {
    this.eventProvider.eventDetails(this.navParams.get('eventId'))
      .on('value', eventSnapshot => {
        this.currentEvent = eventSnapshot.val();
        this.date = eventSnapshot.val().date;
      });
  }

  updateName():void{
    const alert:Alert = this.alertCtrl.create({
      message: 'Edit name',
      inputs: [
        {
          name: 'name',
          placeholder: 'Enter name',
          value: this.currentEvent.name
        },
      ],
      buttons: [
        { text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            this.eventProvider.updateName( this.navParams.get('eventId'), data.name);
          }
        }
      ]
    });
    alert.present();
  }

  updatePrice():void{
    const alert:Alert = this.alertCtrl.create({
      message: 'Edit price',
      inputs: [
        {
          name: 'price',
          placeholder: 'Enter price',
          value: this.currentEvent.price
        },
      ],
      buttons: [
        { text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            this.eventProvider.updatePrice(this.navParams.get('eventId'), data.price);
          }
        }
      ]
    });
    alert.present();
  }

  updateCost():void{
    const alert:Alert = this.alertCtrl.create({
      message: 'Edit cost',
      inputs: [
        {
          name: 'cost',
          placeholder: 'Enter cost',
          value: this.currentEvent.cost
        }
      ],
      buttons: [
        { text: 'Cancel'},
        {
          text: 'Save',
          handler: data => {
            this.eventProvider.updateCost(this.navParams.get('eventId'), data.cost);
          }
        }
      ]
    });
    alert.present();
  }

  updateDate(date:string):void{
    this.eventProvider.updateDate(this.navParams.get('eventId'), date);
  }
}
