import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { User } from '../../providers/providers';
import { HomePage } from '../home/home';
import {WelcomePage} from "../welcome/welcome";


@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  account: { email: string, password: string, id: string } = {
    email: '',
    password: '',
    id: ''
  };

  private loginErrorString: string;
  private loginSuccessString: string;
  private loginRejectString: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public toastCtrl: ToastController,
              private app:App, private storage: Storage) {

    this.loginErrorString = "Logout Error";
    this.loginRejectString = "Logout Reject";
    this.loginSuccessString = "Logout Success!!!";

    this.doLogout();
  }

  doLogout() {
    this.user.logout(this.account).subscribe((resp) => {
      this.app.getRootNav().setRoot(WelcomePage);
      if (resp['status'] == 'success') {
        this.storage.remove('token');
        this.storage.remove('email');
        this.storage.remove('id');
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
      // Unable to log out
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
