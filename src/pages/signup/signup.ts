import { Component, ViewChild } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { User } from '../../providers/providers';
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html'
})

export class SignupPage {
  @ViewChild(Nav) nav: Nav;
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { nickname: string, email: string, password: string } = {
    nickname: '',
    email: '',
    password: ''
  };

  // Toast text strings
  private signupErrorString: string;
  private signupSuccessString: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public toastCtrl: ToastController,
              private app:App,
              private storage: Storage) {

      this.signupErrorString = "SignUp Error";
      this.signupSuccessString = "SignUp Success!!!";
  }

  doSignup() {
    // Attempt to login in through our User service
    this.user.signup(this.account).subscribe((resp) => {
      this.app.getRootNav().setRoot(HomePage);

      if (resp['status'] == 'success') {
        // Able to sign up
        let toast = this.toastCtrl.create({
          message: this.signupSuccessString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
    }, (err) => {

      this.app.getRootNav().setRoot(HomePage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }
}

