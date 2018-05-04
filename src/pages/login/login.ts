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

  // login object
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };

  // Toast Strings
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
      this.loginSuccessString = "Login Success";
  }

  // Attempt to login
  login() {
    // account data ready
    console.log("Login request: ");
    console.log(this.account);
    this.user.login(this.account).subscribe((resp) => {
      if (resp['status'] == 'success') {
        console.log('Login status: success');
        // store login data
        this.storage.set('token', resp['token']);
        this.storage.set('email', resp['email']);
        this.storage.set('id', resp['id']);
        // toast success
        let toast = this.toastCtrl.create({
          message: this.loginSuccessString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        // go to HomePage
        this.app.getRootNav().setRoot(HomePage);
      }
      else {
        console.log('Login status: '+resp['status']);
        // clear login data
        this.storage.remove('token');
        this.storage.remove('email');
        this.storage.remove('id');
        // toast reject
        let toast = this.toastCtrl.create({
          message: this.loginRejectString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        // stay at WelcomePage
      }
    }, (err) => {
      console.log('Login status: error');
      // Toast error
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // stay at WelcomePage
    });
  }

  // onPageLoad
  ionViewDidLoad() {
    console.log('LoginPage loaded');
  }
}
