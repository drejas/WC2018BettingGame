import { ScreenOrientation } from '@ionic-native/Screen-orientation';
import { Component, ViewChild } from '@angular/core';
import {App, IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import { Nav, Platform } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { User } from '../../providers/providers';
import {HomePage} from "../home/home";
import { AdmobFreeProvider } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html',
})

export class WelcomePage {

  // for AdMob
  public bannerSize: any;
  public bannerSizeOpts = {};
  public bannerAtTop: boolean = false;
  public bannerOverlap: boolean = true;
  public adAutoShow: boolean = true;
  public keys;

  // login object
  loginData: { token: string, email: string, id: string } = {
    token: null,
    email: null,
    id: null
  };

  // ToastStrings
  private serverErrorString: string;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private screenOrientation: ScreenOrientation,
              private storage: Storage, public user: User, public toastCtrl: ToastController, public app:App,
              private admobFree: AdmobFreeProvider, private platform: Platform) {

    //screenOrientation.lock(screenOrientation.ORIENTATIONS.PORTRAIT);
    this.serverErrorString = "Please check your internet connection";

    this.setLoginData().then( ()=> {
      console.log(this.loginData);
      this.checkLogin();
    }, (err) => {
      console.log("loginData does not exist");
    });

    this.platform.ready().then(() => {
      if(this.platform.is('android')) {
        this.bannerSizeOpts = this.admobFree.bannerSizes[0]['android'];
      } else if(this.platform.is('android')) {
        this.bannerSizeOpts = this.admobFree.bannerSizes[1]['ios'];
      }
      this.keys = Object.keys(this.bannerSizeOpts);
    });

  }

  // set LoginData fields
  setLoginData(){
    let emailPromise = this.storage.get('email').then((val) => {
      this.loginData.email = val;
      console.log("Email: " + this.loginData.email);
    });
    let tokenPromise = this.storage.get('token').then((val) => {
      this.loginData.token = val;
      console.log("Token: " + this.loginData.token);
    });
    let idPromise = this.storage.get('id').then((val) => {
      this.loginData.id = val;
      console.log("ID: " + this.loginData.id);
    });
    return Promise.all([emailPromise, tokenPromise, idPromise]);
  }

  // check if user is LoggedIn
  checkLogin() {
      if ((this.loginData.token != null)&&(this.loginData.email != null)&&(this.loginData.id != null)) {
        // loginData ready
        console.log("checkLogin request: ");
        this.user.checkLogin(this.loginData).subscribe((resp) => {
          if (resp['status'] == 'success') {
            console.log('checkLogin status: success');
            // store login data
            this.storage.set('token', resp['token']);
            this.storage.set('email', resp['email']);
            this.storage.set('id', resp['id']);
            // go to HomePage
            this.app.getRootNav().setRoot(HomePage);
            return true;
          }
          else{
            console.log('checkLogin status: '+resp['status']);
            // clear login data
            this.storage.remove('token');
            this.storage.remove('email');
            this.storage.remove('id');
            // stay at WelcomePage
            return false;
          }
        }, (err) => {
          console.log('checkLogin: No response from Server');
          let toast = this.toastCtrl.create({
            message: this.serverErrorString,
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          return false;
        });
      }
      else{
        console.log('checkLogin: There is no Token, Email or ID available');
        // clear login data
        this.storage.remove('token');
        this.storage.remove('email');
        this.storage.remove('id');
        // stay at WelcomePage
        return false;
      }
  }

  // go to login page
  login() {
    this.navCtrl.push('LoginPage');
  }

  // go to signup page
  signup() {
    this.navCtrl.push('SignupPage');
  }

  // onPageLoad
  ionViewDidLoad() {
    console.log('WelcomePage loaded');
  }

  // for AdMob functions
  prepareBanner() {
    this.admobFree.bannerConfig = {
      size: this.bannerSize,
      bannerAtTop: this.bannerAtTop,
      // overlap: this.bannerOverlap, // Not sure if deprecated, it bugs out if set to 'false' then back to 'true'. Waiting confirmation from developer.
      autoShow: this.adAutoShow
    };
    this.admobFree.prepareBanner();
    console.log('prepareBanner() called.');
  }

  showBanner() {
    this.admobFree.bannerConfig = {
      size: this.bannerSize,
      bannerAtTop: this.bannerAtTop,
      // overlap: this.bannerOverlap, // Not sure if deprecated, it bugs out if set to 'false' then back to 'true'. Waiting confirmation from developer.
      autoShow: this.adAutoShow
    };
    this.admobFree.showBanner();
    console.log('showBanner() called.');
  }

  hideBanner() {
    this.admobFree.hideBanner();
    console.log('hideBanner() called.');
  }

  removeBanner() {
    this.admobFree.removeBanner();
    console.log('removeBanner() called.');
  }

  prepareInterstitial() {
    this.admobFree.interstitialConfig = {
      autoShow: this.adAutoShow
    }
    this.admobFree.prepareInterstitial();
    console.log('prepareInterstitial() called.');
  }

  showInterstitial() {
    this.admobFree.interstitialConfig = {
      autoShow: this.adAutoShow
    }
    this.admobFree.showInterstitial();
    console.log('showInterstitial() called.');
  }
}
