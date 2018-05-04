import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';
import { Storage } from '@ionic/Storage';
import {Games} from "../../providers/games/games";

/**
 * Generated class for the GameStandingsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-game-standings',
  templateUrl: 'game-standings.html',
})
export class GameStandingsPage {

  // game object
  game: { id: string, title: string, owner: string, code: string, token: string, user_id: string } = {
    id: '',
    title: '',
    owner: '',
    code: '',
    token: '',
    user_id: ''
  };

  // places object for standings table
  places: Array<{position: string, avatar: string, nickname: string, pts3: string, pts: string}>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage, public games: Games, public toastCtrl: ToastController, public loadingCtrl: LoadingController) {

    this.places = [];

    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    loading.present();

    this.setGame().then( ()=> {
      console.log(this.game);
      // get Game Standings
      this.games.get_gameStandings(this.game).subscribe((resp) => {
        var i=0;
        while(resp[i]){
          this.places.push({position: resp[i]['position'], avatar: resp[i]['avatar'], nickname: resp[i]['nickname'], pts3: resp[i]['pts3'], pts: resp[i]['pts']});
          i++;
        }
        loading.dismiss();
      }, (err) => {
        // Unable to get Game Standings
        let toast = this.toastCtrl.create({
          message: "Error. Please check your connection.",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
    }, (err) => {
      console.log("Game does not exist");
    });

  }

  // set game fields
  setGame(){
    this.game['id'] = this.navParams.get("id");
    this.game['title'] = this.navParams.get("title");
    this.game['owner'] = this.navParams.get("owner");
    this.game['code'] = this.navParams.get("code");
    let tokenPromise = this.storage.get('token').then((val) => {
      this.game.token = val;
      console.log("Token: " + this.game.token);
    });
    let idPromise = this.storage.get('id').then((val) => {
      this.game.user_id = val;
      console.log("User ID: " + this.game.user_id);
    });
    return Promise.all([tokenPromise, idPromise]);
  }

  ionViewDidLoad() {
    console.log('GameStandingsPage loaded');
  }

}
