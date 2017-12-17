import { Component } from '@angular/core';
import {App, IonicPage, NavController, NavParams, Platform, ToastController} from 'ionic-angular';
import { Games } from '../../providers/providers';
import {HomePage} from "../home/home";

export interface Slide {
  group1: String
  group2: String
  group3: String
  group4: String
  m1_id: String
  m2_id: String
  m3_id: String
  m4_id: String
  flaga1: String
  flaga2: String
  flaga3: String
  flaga4: String
  m1: String
  m2: String
  m3: String
  m4: String
  m1_mecze: String
  m2_mecze: String
  m3_mecze: String
  m4_mecze: String
  m1_W: String
  m2_W: String
  m3_W: String
  m4_W: String
  m1_D: String
  m2_D: String
  m3_D: String
  m4_D: String
  m1_L: String
  m2_L: String
  m3_L: String
  m4_L: String
  m1_GS: String
  m2_GS: String
  m3_GS: String
  m4_GS: String
  m1_GC: String
  m2_GC: String
  m3_GC: String
  m4_GC: String
  m1_dif: String
  m2_dif: String
  m3_dif: String
  m4_dif: String
  m1_pts: String
  m2_pts: String
  m3_pts: String
  m4_pts: String
}

@IonicPage()
@Component({
  selector: 'page-group-stage',
  templateUrl: 'group-stage.html',
})

export class GroupStagePage {
  slides: Slide[];
  dir: string = 'ltr';
  private groupsErrorString: string;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public games: Games,
              public toastCtrl: ToastController,
              private app: App,
              public platform: Platform) {
    this.dir = platform.dir();
    this.groupsErrorString = "Error while getting Groups from the server!!!";

    this.getGroups();
  }

  getGroups() {
    // Attempt to get games through games service
    this.games.get_groups().subscribe((resp) => {

    this.slides = [
      {
        group1: resp[0]['group'],
        group2: resp[1]['group'],
        group3: resp[2]['group'],
        group4: resp[3]['group'],
        m1_id: resp[0]['id'],
        m2_id: resp[1]['id'],
        m3_id: resp[2]['id'],
        m4_id: resp[3]['id'],
        flaga1: resp[0]['flag'],
        flaga2: resp[1]['flag'],
        flaga3: resp[2]['flag'],
        flaga4: resp[3]['flag'],
        m1: resp[0]['name'],
        m2: resp[1]['name'],
        m3: resp[2]['name'],
        m4: resp[3]['name'],
        m1_mecze: resp[0]['games_played'],
        m2_mecze: resp[1]['games_played'],
        m3_mecze: resp[2]['games_played'],
        m4_mecze: resp[3]['games_played'],
        m1_W: resp[0]['games_won'],
        m2_W: resp[1]['games_won'],
        m3_W: resp[2]['games_won'],
        m4_W: resp[3]['games_won'],
        m1_D: resp[0]['games_drawn'],
        m2_D: resp[1]['games_drawn'],
        m3_D: resp[2]['games_drawn'],
        m4_D: resp[3]['games_drawn'],
        m1_L: resp[0]['games_lost'],
        m2_L: resp[1]['games_lost'],
        m3_L: resp[2]['games_lost'],
        m4_L: resp[3]['games_lost'],
        m1_GS: resp[0]['goals_s'],
        m2_GS: resp[1]['goals_s'],
        m3_GS: resp[2]['goals_s'],
        m4_GS: resp[3]['goals_s'],
        m1_GC: resp[0]['goals_c'],
        m2_GC: resp[1]['goals_c'],
        m3_GC: resp[2]['goals_c'],
        m4_GC: resp[3]['goals_c'],
        m1_dif: resp[0]['goal_difference'],
        m2_dif: resp[1]['goal_difference'],
        m3_dif: resp[2]['goal_difference'],
        m4_dif: resp[3]['goal_difference'],
        m1_pts: resp[0]['points'],
        m2_pts: resp[1]['points'],
        m3_pts: resp[2]['points'],
        m4_pts: resp[3]['points'],
      },
      {
        group1: resp[4]['group'],
        group2: resp[5]['group'],
        group3: resp[6]['group'],
        group4: resp[7]['group'],
        m1_id: resp[4]['id'],
        m2_id: resp[5]['id'],
        m3_id: resp[6]['id'],
        m4_id: resp[7]['id'],
        flaga1: resp[4]['flag'],
        flaga2: resp[5]['flag'],
        flaga3: resp[6]['flag'],
        flaga4: resp[7]['flag'],
        m1: resp[4]['name'],
        m2: resp[5]['name'],
        m3: resp[6]['name'],
        m4: resp[7]['name'],
        m1_mecze: resp[4]['games_played'],
        m2_mecze: resp[5]['games_played'],
        m3_mecze: resp[6]['games_played'],
        m4_mecze: resp[7]['games_played'],
        m1_W: resp[4]['games_won'],
        m2_W: resp[5]['games_won'],
        m3_W: resp[6]['games_won'],
        m4_W: resp[7]['games_won'],
        m1_D: resp[4]['games_drawn'],
        m2_D: resp[5]['games_drawn'],
        m3_D: resp[6]['games_drawn'],
        m4_D: resp[7]['games_drawn'],
        m1_L: resp[4]['games_lost'],
        m2_L: resp[5]['games_lost'],
        m3_L: resp[6]['games_lost'],
        m4_L: resp[7]['games_lost'],
        m1_GS: resp[4]['goals_s'],
        m2_GS: resp[5]['goals_s'],
        m3_GS: resp[6]['goals_s'],
        m4_GS: resp[7]['goals_s'],
        m1_GC: resp[4]['goals_c'],
        m2_GC: resp[5]['goals_c'],
        m3_GC: resp[6]['goals_c'],
        m4_GC: resp[7]['goals_c'],
        m1_dif: resp[4]['goal_difference'],
        m2_dif: resp[5]['goal_difference'],
        m3_dif: resp[6]['goal_difference'],
        m4_dif: resp[7]['goal_difference'],
        m1_pts: resp[4]['points'],
        m2_pts: resp[5]['points'],
        m3_pts: resp[6]['points'],
        m4_pts: resp[7]['points'],
      },
      {
        group1: resp[8]['group'],
        group2: resp[9]['group'],
        group3: resp[10]['group'],
        group4: resp[11]['group'],
        m1_id: resp[8]['id'],
        m2_id: resp[9]['id'],
        m3_id: resp[10]['id'],
        m4_id: resp[11]['id'],
        flaga1: resp[8]['flag'],
        flaga2: resp[9]['flag'],
        flaga3: resp[10]['flag'],
        flaga4: resp[11]['flag'],
        m1: resp[8]['name'],
        m2: resp[9]['name'],
        m3: resp[10]['name'],
        m4: resp[11]['name'],
        m1_mecze: resp[8]['games_played'],
        m2_mecze: resp[9]['games_played'],
        m3_mecze: resp[10]['games_played'],
        m4_mecze: resp[11]['games_played'],
        m1_W: resp[8]['games_won'],
        m2_W: resp[9]['games_won'],
        m3_W: resp[10]['games_won'],
        m4_W: resp[11]['games_won'],
        m1_D: resp[8]['games_drawn'],
        m2_D: resp[9]['games_drawn'],
        m3_D: resp[10]['games_drawn'],
        m4_D: resp[11]['games_drawn'],
        m1_L: resp[8]['games_lost'],
        m2_L: resp[9]['games_lost'],
        m3_L: resp[10]['games_lost'],
        m4_L: resp[11]['games_lost'],
        m1_GS: resp[8]['goals_s'],
        m2_GS: resp[9]['goals_s'],
        m3_GS: resp[10]['goals_s'],
        m4_GS: resp[11]['goals_s'],
        m1_GC: resp[8]['goals_c'],
        m2_GC: resp[9]['goals_c'],
        m3_GC: resp[10]['goals_c'],
        m4_GC: resp[11]['goals_c'],
        m1_dif: resp[8]['goal_difference'],
        m2_dif: resp[9]['goal_difference'],
        m3_dif: resp[10]['goal_difference'],
        m4_dif: resp[11]['goal_difference'],
        m1_pts: resp[8]['points'],
        m2_pts: resp[9]['points'],
        m3_pts: resp[10]['points'],
        m4_pts: resp[11]['points'],
      },
      {
        group1: resp[12]['group'],
        group2: resp[13]['group'],
        group3: resp[14]['group'],
        group4: resp[15]['group'],
        m1_id: resp[12]['id'],
        m2_id: resp[13]['id'],
        m3_id: resp[14]['id'],
        m4_id: resp[15]['id'],
        flaga1: resp[12]['flag'],
        flaga2: resp[13]['flag'],
        flaga3: resp[14]['flag'],
        flaga4: resp[15]['flag'],
        m1: resp[12]['name'],
        m2: resp[13]['name'],
        m3: resp[14]['name'],
        m4: resp[15]['name'],
        m1_mecze: resp[12]['games_played'],
        m2_mecze: resp[13]['games_played'],
        m3_mecze: resp[14]['games_played'],
        m4_mecze: resp[15]['games_played'],
        m1_W: resp[12]['games_won'],
        m2_W: resp[13]['games_won'],
        m3_W: resp[14]['games_won'],
        m4_W: resp[15]['games_won'],
        m1_D: resp[12]['games_drawn'],
        m2_D: resp[13]['games_drawn'],
        m3_D: resp[14]['games_drawn'],
        m4_D: resp[15]['games_drawn'],
        m1_L: resp[12]['games_lost'],
        m2_L: resp[13]['games_lost'],
        m3_L: resp[14]['games_lost'],
        m4_L: resp[15]['games_lost'],
        m1_GS: resp[12]['goals_s'],
        m2_GS: resp[13]['goals_s'],
        m3_GS: resp[14]['goals_s'],
        m4_GS: resp[15]['goals_s'],
        m1_GC: resp[12]['goals_c'],
        m2_GC: resp[13]['goals_c'],
        m3_GC: resp[14]['goals_c'],
        m4_GC: resp[15]['goals_c'],
        m1_dif: resp[12]['goal_difference'],
        m2_dif: resp[13]['goal_difference'],
        m3_dif: resp[14]['goal_difference'],
        m4_dif: resp[15]['goal_difference'],
        m1_pts: resp[12]['points'],
        m2_pts: resp[13]['points'],
        m3_pts: resp[14]['points'],
        m4_pts: resp[15]['points'],
      },
      {
        group1: resp[16]['group'],
        group2: resp[17]['group'],
        group3: resp[18]['group'],
        group4: resp[19]['group'],
        m1_id: resp[16]['id'],
        m2_id: resp[17]['id'],
        m3_id: resp[18]['id'],
        m4_id: resp[19]['id'],
        flaga1: resp[16]['flag'],
        flaga2: resp[17]['flag'],
        flaga3: resp[18]['flag'],
        flaga4: resp[19]['flag'],
        m1: resp[16]['name'],
        m2: resp[17]['name'],
        m3: resp[18]['name'],
        m4: resp[19]['name'],
        m1_mecze: resp[16]['games_played'],
        m2_mecze: resp[17]['games_played'],
        m3_mecze: resp[18]['games_played'],
        m4_mecze: resp[19]['games_played'],
        m1_W: resp[16]['games_won'],
        m2_W: resp[17]['games_won'],
        m3_W: resp[18]['games_won'],
        m4_W: resp[19]['games_won'],
        m1_D: resp[16]['games_drawn'],
        m2_D: resp[17]['games_drawn'],
        m3_D: resp[18]['games_drawn'],
        m4_D: resp[19]['games_drawn'],
        m1_L: resp[16]['games_lost'],
        m2_L: resp[17]['games_lost'],
        m3_L: resp[18]['games_lost'],
        m4_L: resp[19]['games_lost'],
        m1_GS: resp[16]['goals_s'],
        m2_GS: resp[17]['goals_s'],
        m3_GS: resp[18]['goals_s'],
        m4_GS: resp[19]['goals_s'],
        m1_GC: resp[16]['goals_c'],
        m2_GC: resp[17]['goals_c'],
        m3_GC: resp[18]['goals_c'],
        m4_GC: resp[19]['goals_c'],
        m1_dif: resp[16]['goal_difference'],
        m2_dif: resp[17]['goal_difference'],
        m3_dif: resp[18]['goal_difference'],
        m4_dif: resp[19]['goal_difference'],
        m1_pts: resp[16]['points'],
        m2_pts: resp[17]['points'],
        m3_pts: resp[18]['points'],
        m4_pts: resp[19]['points'],
      },
      {
        group1: resp[20]['group'],
        group2: resp[21]['group'],
        group3: resp[22]['group'],
        group4: resp[23]['group'],
        m1_id: resp[20]['id'],
        m2_id: resp[21]['id'],
        m3_id: resp[22]['id'],
        m4_id: resp[23]['id'],
        flaga1: resp[20]['flag'],
        flaga2: resp[21]['flag'],
        flaga3: resp[22]['flag'],
        flaga4: resp[23]['flag'],
        m1: resp[20]['name'],
        m2: resp[21]['name'],
        m3: resp[22]['name'],
        m4: resp[23]['name'],
        m1_mecze: resp[20]['games_played'],
        m2_mecze: resp[21]['games_played'],
        m3_mecze: resp[22]['games_played'],
        m4_mecze: resp[23]['games_played'],
        m1_W: resp[20]['games_won'],
        m2_W: resp[21]['games_won'],
        m3_W: resp[22]['games_won'],
        m4_W: resp[23]['games_won'],
        m1_D: resp[20]['games_drawn'],
        m2_D: resp[21]['games_drawn'],
        m3_D: resp[22]['games_drawn'],
        m4_D: resp[23]['games_drawn'],
        m1_L: resp[20]['games_lost'],
        m2_L: resp[21]['games_lost'],
        m3_L: resp[22]['games_lost'],
        m4_L: resp[23]['games_lost'],
        m1_GS: resp[20]['goals_s'],
        m2_GS: resp[21]['goals_s'],
        m3_GS: resp[22]['goals_s'],
        m4_GS: resp[23]['goals_s'],
        m1_GC: resp[20]['goals_c'],
        m2_GC: resp[21]['goals_c'],
        m3_GC: resp[22]['goals_c'],
        m4_GC: resp[23]['goals_c'],
        m1_dif: resp[20]['goal_difference'],
        m2_dif: resp[21]['goal_difference'],
        m3_dif: resp[22]['goal_difference'],
        m4_dif: resp[23]['goal_difference'],
        m1_pts: resp[20]['points'],
        m2_pts: resp[21]['points'],
        m3_pts: resp[22]['points'],
        m4_pts: resp[23]['points'],
      },
      {
        group1: resp[24]['group'],
        group2: resp[25]['group'],
        group3: resp[26]['group'],
        group4: resp[27]['group'],
        m1_id: resp[24]['id'],
        m2_id: resp[25]['id'],
        m3_id: resp[26]['id'],
        m4_id: resp[27]['id'],
        flaga1: resp[24]['flag'],
        flaga2: resp[25]['flag'],
        flaga3: resp[26]['flag'],
        flaga4: resp[27]['flag'],
        m1: resp[24]['name'],
        m2: resp[25]['name'],
        m3: resp[26]['name'],
        m4: resp[27]['name'],
        m1_mecze: resp[24]['games_played'],
        m2_mecze: resp[25]['games_played'],
        m3_mecze: resp[26]['games_played'],
        m4_mecze: resp[27]['games_played'],
        m1_W: resp[24]['games_won'],
        m2_W: resp[25]['games_won'],
        m3_W: resp[26]['games_won'],
        m4_W: resp[27]['games_won'],
        m1_D: resp[24]['games_drawn'],
        m2_D: resp[25]['games_drawn'],
        m3_D: resp[26]['games_drawn'],
        m4_D: resp[27]['games_drawn'],
        m1_L: resp[24]['games_lost'],
        m2_L: resp[25]['games_lost'],
        m3_L: resp[26]['games_lost'],
        m4_L: resp[27]['games_lost'],
        m1_GS: resp[24]['goals_s'],
        m2_GS: resp[25]['goals_s'],
        m3_GS: resp[26]['goals_s'],
        m4_GS: resp[27]['goals_s'],
        m1_GC: resp[24]['goals_c'],
        m2_GC: resp[25]['goals_c'],
        m3_GC: resp[26]['goals_c'],
        m4_GC: resp[27]['goals_c'],
        m1_dif: resp[24]['goal_difference'],
        m2_dif: resp[25]['goal_difference'],
        m3_dif: resp[26]['goal_difference'],
        m4_dif: resp[27]['goal_difference'],
        m1_pts: resp[24]['points'],
        m2_pts: resp[25]['points'],
        m3_pts: resp[26]['points'],
        m4_pts: resp[27]['points'],
      },
      {
        group1: resp[28]['group'],
        group2: resp[29]['group'],
        group3: resp[30]['group'],
        group4: resp[31]['group'],
        m1_id: resp[28]['id'],
        m2_id: resp[29]['id'],
        m3_id: resp[30]['id'],
        m4_id: resp[31]['id'],
        flaga1: resp[28]['flag'],
        flaga2: resp[29]['flag'],
        flaga3: resp[30]['flag'],
        flaga4: resp[31]['flag'],
        m1: resp[28]['name'],
        m2: resp[29]['name'],
        m3: resp[30]['name'],
        m4: resp[31]['name'],
        m1_mecze: resp[28]['games_played'],
        m2_mecze: resp[29]['games_played'],
        m3_mecze: resp[30]['games_played'],
        m4_mecze: resp[31]['games_played'],
        m1_W: resp[28]['games_won'],
        m2_W: resp[29]['games_won'],
        m3_W: resp[30]['games_won'],
        m4_W: resp[31]['games_won'],
        m1_D: resp[28]['games_drawn'],
        m2_D: resp[29]['games_drawn'],
        m3_D: resp[30]['games_drawn'],
        m4_D: resp[31]['games_drawn'],
        m1_L: resp[28]['games_lost'],
        m2_L: resp[29]['games_lost'],
        m3_L: resp[30]['games_lost'],
        m4_L: resp[31]['games_lost'],
        m1_GS: resp[28]['goals_s'],
        m2_GS: resp[29]['goals_s'],
        m3_GS: resp[30]['goals_s'],
        m4_GS: resp[31]['goals_s'],
        m1_GC: resp[28]['goals_c'],
        m2_GC: resp[29]['goals_c'],
        m3_GC: resp[30]['goals_c'],
        m4_GC: resp[31]['goals_c'],
        m1_dif: resp[28]['goal_difference'],
        m2_dif: resp[29]['goal_difference'],
        m3_dif: resp[30]['goal_difference'],
        m4_dif: resp[31]['goal_difference'],
        m1_pts: resp[28]['points'],
        m2_pts: resp[29]['points'],
        m3_pts: resp[30]['points'],
        m4_pts: resp[31]['points'],
      },
    ];
    }, (err) => {

      this.app.getRootNav().setRoot(HomePage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.groupsErrorString,
        duration: 3000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad GroupStagePage');
  }

}
