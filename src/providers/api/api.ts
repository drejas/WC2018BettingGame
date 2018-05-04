import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class Api {
  url: string = 'http://app.wc2018betapp.com/';

  constructor(public http: HttpClient) {
  }

  // Http Request GET method
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams()
      };
    }

    // Support easy query params for GET requests
    if (params) {
      reqOpts.params = new HttpParams();
      for (let k in params) {
        reqOpts.params.set(k, params[k]);
      }
    }

    return this.http.get(this.url + '/' + endpoint, reqOpts);
  }

  // Http Request POST method
  post(endpoint: string, body: any) {
    return this.http.post(this.url + '/' + endpoint, body);
  }
}
