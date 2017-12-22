import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
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
    email: '',
    password: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private loginSuccessString: string;
  private loginRejectString: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public toastCtrl: ToastController,
              private app:App, private storage: Storage) {

      this.loginErrorString = "Login Error";
      this.loginRejectString = "Login Reject";
      this.loginSuccessString = "Login Success!!!";
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      this.app.getRootNav().setRoot(HomePage);
      if (resp['status'] == 'success') {
        this.storage.set('token', resp['token']);
        this.storage.set('email', resp['email']);
        this.storage.set('id', resp['id']);
        // Able to sign up
        let toast = this.toastCtrl.create({
          message: this.loginSuccessString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else if (resp['status'] == 'reject') {
        // Able to sign up
        let toast = this.toastCtrl.create({
          message: this.loginRejectString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
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
