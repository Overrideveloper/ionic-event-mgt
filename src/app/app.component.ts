import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { TabsPage } from '../pages/tabs/tabs';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage :any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    firebase.initializeApp({
      apiKey: "AIzaSyBh1KUt3Aa6puJ8wRrtR7Cd1E7TkSy7UXU",
      authDomain: "ionic-event-manager.firebaseapp.com",
      databaseURL: "https://ionic-event-manager.firebaseio.com",
      storageBucket: "ionic-event-manager.appspot.com",
      messagingSenderId: "709531941984"
    });
    
    const unsubscribe = firebase.auth().onAuthStateChanged(user => {
      if(!user){
        this.rootPage = 'LoginPage';
        unsubscribe();
      }
      else{
        this.rootPage = TabsPage;
        unsubscribe();
      }
    });

    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}

