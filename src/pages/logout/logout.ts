import { Component } from '@angular/core';
import { App, IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import { User } from '../../providers/providers';
import { HomePage } from '../home/home';
import { WelcomePage } from '../welcome/welcome';


@IonicPage()
@Component({
  selector: 'page-logout',
  templateUrl: 'logout.html',
})
export class LogoutPage {
  account: { email: string, token: string, id: string } = {
    email: '',
    token: '',
    id: ''
  };

  private loginErrorString: string;
  private jsonErrorString: string;
  private dbFailureString: string;
  private loginSuccessString: string;
  private loginRejectString: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public user: User,
              public toastCtrl: ToastController,
              private app:App, private storage: Storage) {

    this.loginErrorString = "Logout Error";
    this.jsonErrorString = "Connection Error";
    this.dbFailureString = "Database Error";
    this.loginRejectString = "Logout Reject";
    this.loginSuccessString = "Logout Success!";

    this.setAccount().then( ()=> {
      console.log(this.account);
      this.doLogout();
    });
  }

  doLogout() {
    this.user.logout(this.account).subscribe((resp) => {
      this.app.getRootNav().setRoot(WelcomePage);
      if (resp['status'] == 'success') {
        this.storage.remove('token');
        this.storage.remove('email');
        this.storage.remove('id');
        // Able to Logout
        let toast = this.toastCtrl.create({
          message: this.loginSuccessString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else if (resp['status'] == 'reject') {
        // Logout Reject - wrong Token?
        let toast = this.toastCtrl.create({
          message: this.loginRejectString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else if (resp['status'] == 'failure_db') {
        // DB failure
        let toast = this.toastCtrl.create({
          message: this.dbFailureString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      }
      else{
        // JSON Error
        let toast = this.toastCtrl.create({
          message: this.jsonErrorString,
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
        position: 'bottom'
      });
      toast.present();
    });
  }

  // set Account fields
  setAccount(){
    let emailPromise = this.storage.get('email').then((val) => {
      this.account.email = val;
      console.log("Email: " + this.account.email);
    });
    let idPromise = this.storage.get('id').then((val) => {
      this.account.id = val;
      console.log("ID: " + this.account.id);
    });
    let tokenPromise = this.storage.get('token').then((val) => {
      this.account.token = val;
      console.log("Token: " + this.account.token);
    });
    return Promise.all([emailPromise, idPromise, tokenPromise]);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LogoutPage');
  }

}
