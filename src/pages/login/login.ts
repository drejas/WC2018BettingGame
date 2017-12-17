import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { HomePage } from '../home/home';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: 'test@example.com',
    password: 'test'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public toastCtrl: ToastController,
              private app:App) {


      this.loginErrorString = "LoginError";

  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.app.getRootNav().setRoot(HomePage);
    }, (err) => {
      this.app.getRootNav().setRoot(HomePage);
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
