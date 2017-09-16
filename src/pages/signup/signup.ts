import { Component } from '@angular/core';
import { IonicPage, Alert, AlertController, Loading, LoadingController, NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthProvider } from '../../providers/auth/auth';
import { EmailValidator } from '../../validators/email';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  public signupForm:FormGroup;
  public loading:Loading;

  constructor(public navCtrl: NavController, public loadingCtrl:LoadingController, public alertCtrl:AlertController,
    public authProvider:AuthProvider, formBuilder:FormBuilder) {
      this.signupForm = formBuilder.group({
        email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
        password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
      });
  }

  signupUser():void{
    if(!this.signupForm.valid){
      console.log(`Form not complete: ${this.signupForm.value}`);
    }
    else{
      const email:string = this.signupForm.value.email;
      const password:string = this.signupForm.value.password;

      this.authProvider.signUpUser(email, password).then( user => {
        this.loading.dismiss().then( () => {
          this.navCtrl.setRoot(HomePage);
          const alert:Alert = this.alertCtrl.create({
            message: "Account created",
            buttons: [{ text: "Ok", role:'cancel'}]
          });
          alert.present();
        });
      }, error => {
        this.loading.dismiss().then( () => {
          const alert:Alert = this.alertCtrl.create({
            message: error.message,
            buttons: [{ text: "Ok", role:'cancel'}]
          });
          alert.present();
        });
      });
      this.loading = this.loadingCtrl.create();
      this.loading.present();
    }
  }
}
