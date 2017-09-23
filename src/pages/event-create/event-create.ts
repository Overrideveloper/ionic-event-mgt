import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { EventProvider } from '../../providers/event/event';
import { EventListPage } from '../../pages/event-list/event-list';

/**
 * Generated class for the EventCreatePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-event-create',
  templateUrl: 'event-create.html',
})
export class EventCreatePage {
  public formCreate : FormGroup;

  constructor(public navCtrl: NavController, public eventProvider: EventProvider,
    public formBuilder: FormBuilder) {
      this.formCreate = this.formBuilder.group({
        name: ['', Validators.required],
        cost: ['', Validators.required],
        price: ['', Validators.required],
        date: ['', Validators.required]
      });
    }

  createEvent(eventName:string, eventDate:string, eventPrice:number, eventCost:number)
    :void{
      this.eventProvider.createEvent(eventName, eventDate, eventPrice, eventCost)
        .then( newEvent => {
          this.navCtrl.setRoot(EventListPage);
        })
    }
}
