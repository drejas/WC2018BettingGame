import { Component, ViewChild } from '@angular/core';
import {
  IonicPage, NavController, NavParams, ViewController, Platform, LoadingController,
  ToastController, App
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Camera } from '@ionic-native/camera';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { User } from "../../providers/user/user";
import { Storage } from '@ionic/Storage';
import {WelcomePage} from "../welcome/welcome";

/**
 * Generated class for the SettingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  @ViewChild('fileInput') fileInput;

  // login object
  account: { email: string, nickname: string, password: string, password2: string, avatar: string, token: string, id: string } = {
    email: '',
    nickname: '',
    password: '',
    password2: '',
    avatar: '',
    token: '',
    id: ''
  };

  //isReadyToSave: boolean;
  item: any;
  form: FormGroup;
  private serverErrorString: string;
  emailPattern: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, formBuilder: FormBuilder,
              public camera: Camera, public platform: Platform, private transfer: FileTransfer, private file: File, public loadingCtrl: LoadingController,
              private storage: Storage, public user: User, public toastCtrl: ToastController, public app: App) {

    this.serverErrorString = "Error. Please check your internet connection.";

    this.emailPattern = "^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$";
    this.form = formBuilder.group({
      profilePic: [''],
      email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
      nickname: ['', Validators.required]
    });
/*
    // Watch the form for changes, and
    this.form.valueChanges.subscribe((v) => {
      this.isReadyToSave = this.form.valid;
    });
*/
    this.setAccount().then( ()=> {
      this.getSettings();
    }, (err) => {
      console.log("Account setting failed");
    });

  }

  get officialEmail() {
    return this.form.get('email');
  }

  // set Account fields
  setAccount(){
    console.log("setAccount: ");
    let tokenPromise = this.storage.get('token').then((val) => {
      this.account.token = val;
      console.log("Token: " + this.account.token);
    });
    let idPromise = this.storage.get('id').then((val) => {
      this.account.id = val;
      console.log("ID: " + this.account.id);
    });
    return Promise.all([tokenPromise, idPromise]);
  }

  // get settings
  getSettings(){
    let loader = this.loadingCtrl.create({
      content: ""
    });
    loader.present();
    if ((this.account.token != '')&&(this.account.id != '')) {
      // Account ready
      console.log("getSettings request: ");
      this.user.getSettings(this.account).subscribe((resp) => {
        if (resp['status'] == 'success') {
          console.log('getSettings status: success');
          // store login data
          this.storage.set('token', resp['token']);
          this.storage.set('email', resp['email']);
          this.storage.set('id', resp['id']);
          this.account.avatar = resp['avatar'];
          this.account.nickname = resp['nickname'];
          this.account.email = resp['email'];
          this.account.token = resp['token'];
          this.account.id = resp['id'];
          loader.dismiss();
          return true;
        }
        else{
          console.log('checkLogin status: '+resp['status']);
          // clear login data
          this.storage.remove('token');
          this.storage.remove('email');
          this.storage.remove('id');
          let toast = this.toastCtrl.create({
            message: "Application error occured. Try again by new Login.",
            duration: 3000,
            position: 'bottom'
          });
          loader.dismiss();
          toast.present();
          // go to WelcomePage
          this.app.getRootNav().setRoot(WelcomePage);
          return false;
        }
      }, (err) => {
        console.log('getSettings: No response from Server');
        let toast = this.toastCtrl.create({
          message: this.serverErrorString,
          duration: 3000,
          position: 'bottom'
        });
        loader.dismiss();
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
      loader.dismiss();
      // go to WelcomePage
      this.app.getRootNav().setRoot(WelcomePage);
      return false;
    }
  }

  // save settings
  saveSettings(){
    let loader = this.loadingCtrl.create({
      content: "Saving Settings..."
    });

    console.log('Value of profilePic:' + this.form.get['profilePic']);

    if(this.form.controls['profilePic'].value!='') {
      loader.present();
      this.uploadFile().then( ()=> {
        this.saveTextSettings();
        loader.dismiss();
      }, (err) => {
        console.log("File was not uploaded");
        loader.dismiss();
      });
    }
    else{
      this.saveTextSettings();
      loader.dismiss();
    }
  }

  // save text settings
  saveTextSettings(){
    if ((this.account.token != '')&&(this.account.email != '')&&(this.account.id != '')&&(this.account.nickname != '')) {
      // Account ready
      console.log("saveSettings request: ");
      this.user.saveSettings(this.account).subscribe((resp) => {
        if (resp['status'] == 'success') {
          console.log('saveSettings status: success');
          // store login data
          this.storage.set('token', resp['token']);
          this.storage.set('email', resp['email']);
          this.storage.set('id', resp['id']);
          let toast = this.toastCtrl.create({
            message: "Settings saved.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          return true;
        }
        else{
          console.log('saveSettings status: '+resp['status']);
          // clear login data
          this.storage.remove('token');
          this.storage.remove('email');
          this.storage.remove('id');
          let toast = this.toastCtrl.create({
            message: "Application error occured. try again later.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          return false;
        }
      }, (err) => {
        console.log('saveSettings: No response from Server');
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
      let toast = this.toastCtrl.create({
        message: "Please fill-in Email and Nickname fields.",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return false;
    }
  }

  // change password
  chgPwd(){
    let loader = this.loadingCtrl.create({
      content: "Changing Password..."
    });
    loader.present();
    if ((this.account.token != '')&&(this.account.id != '')&&(this.account.password != '')&&(this.account.password2 != '')) {
      // Account ready
      if(this.account.password==this.account.password2) {
        console.log("chgPwd request: ");
        this.user.chgPwd(this.account).subscribe((resp) => {
          if (resp['status'] == 'success') {
            console.log('chgpwd status: success');
            // store login data
            this.storage.set('token', resp['token']);
            this.storage.set('email', resp['email']);
            this.storage.set('id', resp['id']);
            let toast = this.toastCtrl.create({
              message: "New Password saved.",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            return true;
          }
          else {
            console.log('chgPwd status: ' + resp['status']);
            // clear login data
            this.storage.remove('token');
            this.storage.remove('email');
            this.storage.remove('id');
            let toast = this.toastCtrl.create({
              message: "Application error occured. try again later.",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
            return false;
          }
        }, (err) => {
          console.log('chgPwd: No response from Server');
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
          let toast = this.toastCtrl.create({
            message: "Inserted Passwords do not match. try again.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
          return false;
        }
    }
    else{
      console.log('checkLogin: There is no Token, Email or ID available');
      let toast = this.toastCtrl.create({
        message: "Please fill-in both Password fields.",
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
      return false;
    }
    loader.dismiss();
  }

  // upload avatar
  uploadFile() {
    let uploadPromise = this.storage.get('email').then((val) => {
      console.log("Email: " + this.account.email);
    });
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'profilePic',
      fileName: 'avatar.jpg',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.form.controls['profilePic'].value, 'http://app.wc2018betapp.com/wc_avatar.php', options)
      .then((data) => {
        console.log(data);
        console.log(data+" Uploaded Successfully");
      }, (err) => {
        console.log(err);
      });
    return Promise.all([uploadPromise]);
  }

  getPicture() {
    if (Camera['installed']()) {
      this.camera.getPicture({
        destinationType: this.camera.DestinationType.DATA_URL,
        targetWidth: 96,
        targetHeight: 96
      }).then((data) => {
        this.form.patchValue({ 'profilePic': 'data:image/jpg;base64,' + data });
      }, (err) => {
        alert('Unable to take photo');
      })
    } else {
      this.fileInput.nativeElement.click();
    }
  }

  processWebImage(event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {

      let imageData = (readerEvent.target as any).result;
      this.form.patchValue({ 'profilePic': imageData });
    };

    reader.readAsDataURL(event.target.files[0]);
  }

  getProfileImageStyle() {
    if(this.form.controls['profilePic'].value!=''){
      return 'url(' + this.form.controls['profilePic'].value + ')';
    }
    else{
      return 'url(' + this.account.avatar + ')';
    }

  }

  ionViewDidLoad() {
    console.log('SettingsPage loaded');
  }

}
