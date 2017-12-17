import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ScreenOrientation } from '@ionic-native/Screen-orientation';
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

  constructor(public navCtrl: NavController, public navParams: NavParams, private screenOrientation: ScreenOrientation) {
    //screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
    if(this.checkLogin()){
      this.navCtrl.push('HomePage');
    }
  }

  checkLogin() {

    return true;
  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad WelcomePage');
  }

}
