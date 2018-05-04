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

  // login object
  account: { nickname: string, email: string, password: string, password2: string } = {
    nickname: '',
    email: '',
    password: '',
    password2: ''
  };

  // Toast text strings
  private signupErrorString: string;
  private signupSuccessString: string;
  private signupRejectString: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public toastCtrl: ToastController,
              private app:App,
              private storage: Storage) {

    this.signupErrorString = "SignUp Error";
    this.signupRejectString = "SignUp Reject";
    this.signupSuccessString = "SignUp Success. Please check your Email to finish Registration and then LogIn!";
  }

  signup() {
    // account data ready
    console.log("SignUp request: ");
    console.log(this.account);
    this.user.signup(this.account).subscribe((resp) => {
      if (resp['status'] == 'success') {
        console.log('SignUp status: success');
        // toast success
        let toast = this.toastCtrl.create({
          message: this.signupSuccessString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        // stay at WelcomePage
      }
      else{
        console.log('SignUp status: '+resp['status']);
        // clear login data
        this.storage.remove('token');
        this.storage.remove('email');
        this.storage.remove('id');
        // toast reject
        let toast = this.toastCtrl.create({
          message: this.signupRejectString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
        // stay at WelcomePage
      }
    }, (err) => {
      console.log('SignUp status: error');
      // Toast error
      let toast = this.toastCtrl.create({
        message: this.signupErrorString,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      // stay at WelcomePage
    });
  }
}

