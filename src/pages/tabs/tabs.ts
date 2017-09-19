import { Component } from '@angular/core';
import { HomePage } from '../home/home';
import { LoginPage } from '../login/login';
import { ProfilePage } from '../profile/profile';
import { EventListPage } from '../event-list/event-list';
import { AuthProvider } from '../../providers/auth/auth';
import { Loading, LoadingController, NavController } from 'ionic-angular';

/**
 * Generated class for the TabsPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {
  public loading:Loading;
  tab1Root :any = HomePage;
  tab2Root :any = ProfilePage;
  tab3Root :any = EventListPage;

  constructor( public navCtrl: NavController, public authProvider: AuthProvider, public loadingCtrl: LoadingController ){}
  logout():void{
    this.authProvider.logoutUser().then( authData => {
      this.loading.dismiss().then( () => {
        this.navCtrl.setRoot(LoginPage);
      });
    });
    this.loading = this.loadingCtrl.create();
    this.loading.present();
  }
}
