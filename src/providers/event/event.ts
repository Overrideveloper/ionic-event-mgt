import { Injectable } from '@angular/core';
import firebase from 'firebase';

/*
  Generated class for the EventProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular DI.
*/

@Injectable()
export class EventProvider {
public eventListRef: firebase.database.Reference;
  constructor() {
    firebase.auth().onAuthStateChanged( user => {
      if(user){
        this.eventListRef = firebase.database()
          .ref(`/userProfile/${user.uid}/eventList`);
      }
    });
  }

  createEvent(eventName:string, eventDate:string, eventPrice:number, eventCost:number)
    :firebase.Promise<any>{
      return this.eventListRef.push({
        name: eventName,
        date: eventDate,
        price: eventPrice * 1,
        cost: eventCost * 1
      });
    }

    listEvent():firebase.database.Reference{
      return this.eventListRef;
    }

    eventDetails(eventId:string):firebase.database.Reference{
      return this.eventListRef.child(eventId);
    }
    
    deleteEvent(eventId:string):firebase.Promise<any>{
      return this.eventListRef.child(eventId).remove();
    }

    updateName(eventId:string, eventName: string):firebase.Promise<any>{
      return this.eventListRef.child(eventId).update({ name: eventName });
    }

    updateDate(eventId:string, eventDate: string):firebase.Promise<any>{
      return this.eventListRef.child(eventId).update({ date: eventDate });
    }

    updatePrice(eventId:string, eventPrice: number):firebase.Promise<any>{
      return this.eventListRef.child(eventId).update({ price: eventPrice });
    }

    updateCost(eventId:string, eventCost: number):firebase.Promise<any>{
      return this.eventListRef.child(eventId).update({ cost: eventCost });
    }

}
