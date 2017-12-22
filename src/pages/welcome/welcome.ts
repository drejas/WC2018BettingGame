import { ScreenOrientation } from '@ionic-native/Screen-orientation';
import { Component, ViewChild } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { User } from '../../providers/providers';
import {HomePage} from "../home/home";

/**
 * Generated class for the WelcomePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})
export class WelcomePage {

  loginData: { token: string, email: string, id: string } = {
    token: '',
    email: '',
    id: ''
  };

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private storage: Storage, public user: User, public toastCtrl: ToastController, public app:App) {
    //screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);

    this.checkLogin();
  }

  checkLogin() {
    this.storage.get('email').then((val) => {
      this.loginData.email = val;
    });

    this.storage.get('id').then((val) => {
      this.loginData.id = val;
    });

    this.storage.get('token').then((val) => {
      console.log('Token is ' + val);

      if (val != null) {
        this.loginData.token = val;
        console.log(this.loginData);
        this.user.checkLogin(this.loginData).subscribe((resp) => {
          if (resp['status'] == 'success') {
            this.storage.set('token', resp['token']);
            this.storage.set('email', resp['email']);
            this.storage.set('id', resp['id']);
            this.app.getRootNav().setRoot(HomePage);
            return true;
          }
          else{
            return false;
          }
        }, (err) => {
          return false;
        });
      }
      else{
        return false;
      }
    }, (err) => {
      console.log('There is no Token available');
      return false;
    });
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  logout() {
    this.navCtrl.push('LogoutPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
