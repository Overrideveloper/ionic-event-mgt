import { Component } from '@angular/core';
import { IonicPage, Loading, LoadingController, NavController, Alert, AlertController } from 'ionic-angular';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { AuthProvider } from '../../providers/auth/auth';
import { HomePage } from '../home/home';
import { TabsPage } from '../tabs/tabs';

/**
 * Generated class for the LoginPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public loginForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, 
  public authProvider: AuthProvider, formBuilder: FormBuilder) {
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }
  
    loginUser():void{
      if(!this.loginForm.valid){
        console.log(`Form isn't valid yet, value: ${this.loginForm.value}`);
      }
      else{
        const email = this.loginForm.value.email;
        const password = this.loginForm.value.password;

        this.authProvider.loginUser(email, password).then( authData => {
          this.loading.dismiss().then( () => {
            this.navCtrl.setRoot(TabsPage);
          });
        },
        error => {
          this.loading.dismiss().then( () => {
            const alert:Alert = this.alertCtrl.create({
              message: "Email or password incorrect",
              buttons: [{ text: "Ok", role: 'cancel'}]
            });
            alert.present()
          });
        });
        this.loading = this.loadingCtrl.create();
        this.loading.present();
      }
    }

    goToSignUp():void{
      this.navCtrl.push('SignupPage');
    }

    goToReset():void{
      this.navCtrl.push('ResetPasswordPage');
    }
}