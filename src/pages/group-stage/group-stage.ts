import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, Platform} from 'ionic-angular';

/**
 * Generated class for the GroupStagePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

export interface Slide {
  grupa: String
  flaga1: String
  flaga2: String
  flaga3: String
  flaga4: String
  miejsce1: String
  miejsce2: String
  miejsce3: String
  miejsce4: String
  m1_mecze: number
  m2_mecze: number
  m3_mecze: number
  m4_mecze: number
  m1_W: number
  m2_W: number
  m3_W: number
  m4_W: number
  m1_D: number
  m2_D: number
  m3_D: number
  m4_D: number
  m1_L: number
  m2_L: number
  m3_L: number
  m4_L: number
  m1_GS: number
  m2_GS: number
  m3_GS: number
  m4_GS: number
  m1_GC: number
  m2_GC: number
  m3_GC: number
  m4_GC: number
  m1_dif: number
  m2_dif: number
  m3_dif: number
  m4_dif: number
  m1_pts: number
  m2_pts: number
  m3_pts: number
  m4_pts: number
}

@IonicPage()
@Component({
  selector: 'page-group-stage',
  templateUrl: 'group-stage.html',
})

export class GroupStagePage {
  slides: Slide[];
  dir: string = 'ltr';

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform) {
    this.dir = platform.dir();

    this.slides = [
      {
        grupa: 'A',
        flaga1: 'eg',
        flaga2: 'ru',
        flaga3: 'sa',
        flaga4: 'uy',
        miejsce1: 'Egypt',
        miejsce2: 'Russia',
        miejsce3: 'Saudi Arabia',
        miejsce4: 'Uruguay',
        m1_mecze: 0,
        m2_mecze: 0,
        m3_mecze: 0,
        m4_mecze: 0,
        m1_W: 0,
        m2_W: 0,
        m3_W: 0,
        m4_W: 0,
        m1_D: 0,
        m2_D: 0,
        m3_D: 0,
        m4_D: 0,
        m1_L: 0,
        m2_L: 0,
        m3_L: 0,
        m4_L: 0,
        m1_GS: 0,
        m2_GS: 0,
        m3_GS: 0,
        m4_GS: 0,
        m1_GC: 0,
        m2_GC: 0,
        m3_GC: 0,
        m4_GC: 0,
        m1_dif: 0,
        m2_dif: 0,
        m3_dif: 0,
        m4_dif: 0,
        m1_pts: 0,
        m2_pts: 0,
        m3_pts: 0,
        m4_pts: 0,
      },
      {
        grupa: 'B',
        flaga1: 'ir',
        flaga2: 'mc',
        flaga3: 'pt',
        flaga4: 'es',
        miejsce1: 'Iran',
        miejsce2: 'Morocco',
        miejsce3: 'Portugal',
        miejsce4: 'Spain',
        m1_mecze: 0,
        m2_mecze: 0,
        m3_mecze: 0,
        m4_mecze: 0,
        m1_W: 0,
        m2_W: 0,
        m3_W: 0,
        m4_W: 0,
        m1_D: 0,
        m2_D: 0,
        m3_D: 0,
        m4_D: 0,
        m1_L: 0,
        m2_L: 0,
        m3_L: 0,
        m4_L: 0,
        m1_GS: 0,
        m2_GS: 0,
        m3_GS: 0,
        m4_GS: 0,
        m1_GC: 0,
        m2_GC: 0,
        m3_GC: 0,
        m4_GC: 0,
        m1_dif: 0,
        m2_dif: 0,
        m3_dif: 0,
        m4_dif: 0,
        m1_pts: 0,
        m2_pts: 0,
        m3_pts: 0,
        m4_pts: 0
      },
      {
        grupa: 'C',
        flaga1: 'au',
        flaga2: 'de',
        flaga3: 'fr',
        flaga4: 'pe',
        miejsce1: 'Australia',
        miejsce2: 'Denmark',
        miejsce3: 'France',
        miejsce4: 'Peru',
        m1_mecze: 0,
        m2_mecze: 0,
        m3_mecze: 0,
        m4_mecze: 0,
        m1_W: 0,
        m2_W: 0,
        m3_W: 0,
        m4_W: 0,
        m1_D: 0,
        m2_D: 0,
        m3_D: 0,
        m4_D: 0,
        m1_L: 0,
        m2_L: 0,
        m3_L: 0,
        m4_L: 0,
        m1_GS: 0,
        m2_GS: 0,
        m3_GS: 0,
        m4_GS: 0,
        m1_GC: 0,
        m2_GC: 0,
        m3_GC: 0,
        m4_GC: 0,
        m1_dif: 0,
        m2_dif: 0,
        m3_dif: 0,
        m4_dif: 0,
        m1_pts: 0,
        m2_pts: 0,
        m3_pts: 0,
        m4_pts: 0
      }
    ];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupStagePage');
  }

}
