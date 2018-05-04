import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class User {

  constructor(public api: Api) { }

  // check the Token, Email and ID stored if the user is logged in already and get new Token +Email,+ID
  checkLogin(loginData: any) {
    let seq = this.api.post('wc_check_login.php', JSON.stringify(loginData)).share();

    seq.subscribe((res: any) => {
      console.log("checkLogin response: ");
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  // get user settings for SETTINGS PAGE
  getSettings(loginData: any) {
    let seq = this.api.post('wc_getSettings.php', JSON.stringify(loginData)).share();

    seq.subscribe((res: any) => {
      console.log("getSettings response: ");
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  // get user settings for SETTINGS PAGE
  saveSettings(loginData: any) {
    let seq = this.api.post('wc_saveSettings.php', JSON.stringify(loginData)).share();

    seq.subscribe((res: any) => {
      console.log("saveSettings response: ");
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  // change password for User
  chgPwd(loginData: any) {
    let seq = this.api.post('wc_chgPwd.php', JSON.stringify(loginData)).share();

    seq.subscribe((res: any) => {
      console.log("chgPwd response: ");
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }


  // login using email and password and retrieve ID, Email, Token
  login(loginData: any) {
    let seq = this.api.post('wc_login.php', JSON.stringify(loginData)).share();

    seq.subscribe((res: any) => {
      console.log("Login response: ");
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  // signup to service using Nickname, Email and Password
  signup(loginData: any) {
    let seq = this.api.post('wc_signup.php', JSON.stringify(loginData)).share();

    seq.subscribe((res: any) => {
      console.log("SignUp response: ");
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  // logout using Token, Email and ID
  logout(loginData: any) {
    let seq = this.api.post('wc_logout.php', JSON.stringify(loginData)).share();

    seq.subscribe((res: any) => {
      console.log("Logout response: ");
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
