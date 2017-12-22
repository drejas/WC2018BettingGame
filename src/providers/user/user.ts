import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import { Injectable } from '@angular/core';
import { Api } from '../api/api';

@Injectable()
export class User {

  constructor(public api: Api) { }

  /**
   * Send a POST request to our login endpoint with the Token to check if user is loggedIn.
   */
  checkLogin(loginData: any) {
    let seq = this.api.post('wc_check_login.php', JSON.stringify(loginData)).share();

    seq.subscribe((res: any) => {
      console.log(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        // cos
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    let seq = this.api.post('wc_login.php', JSON.stringify(accountInfo)).share();

    seq.subscribe((res: any) => {
      console.log(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        // cos
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('wc_signup.php', JSON.stringify(accountInfo)).share();

    seq.subscribe((res: any) => {
      console.log(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        // cos tam
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout(accountInfo: any) {
    let seq = this.api.post('wc_logout.php', JSON.stringify(accountInfo)).share();

    seq.subscribe((res: any) => {
      console.log(res);
      // If the API returned a successful response, mark the user as logged in
      if (res.status == 'success') {
        // cos
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

}
