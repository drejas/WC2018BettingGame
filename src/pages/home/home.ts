import { Component } from '@angular/core';
import {ActionSheetController, AlertController, NavController, ToastController} from 'ionic-angular';
import {Games} from "../../providers/games/games";
import { Storage } from '@ionic/Storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  // Array of users BettingGames
  bettingGames: Array<{title: string, id: string, owner: string, code: string}>;

  // login object
  account: { gameId: string, token: string, id: string } = {
    gameId: '',
    token: '',
    id: ''
  };

  // boolean to hide "+" sign before Token is ready
  hideMe: boolean;

  constructor(private storage: Storage, public navCtrl: NavController, public actionSheetCtrl: ActionSheetController, public alertCtrl: AlertController, public games: Games, public toastCtrl: ToastController) {

    this.hideMe = false;
    this.bettingGames = [];

    this.setAccount().then( ()=> {
      console.log(this.account);
      // activate "+" button to add new BettingGames
      this.hideMe = true;
      // get Users BettingGames
      this.games.get_bettingGames(this.account).subscribe((resp) => {
          var i=0;
          while(resp[i]){
            this.bettingGames.push({title: resp[i]['title'], id: resp[i]['id'], owner: resp[i]['owner'], code: resp[i]['code']});
            i++;
          }
      }, (err) => {
        // Unable to get BettingGames
        let toast = this.toastCtrl.create({
          message: "Error. Please check your connection.",
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
    }, (err) => {
      console.log("Account does not exist");
    });

  }

  // set Account fields
  setAccount(){
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

  // go to GameStandingsPage page
  itemSelected(game) {
    this.navCtrl.push('GameStandingsPage', {
      id: game['id'],
      title: game['title'],
      owner: game['owner'],
      code: game['code']
    });
  }

  // Nowa GRA
  addGame() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Add BettingGame',
      buttons: [
        {
          text: 'Create NEW BettingGame',
          handler: () => {
            console.log('Create new BettingGame clicked');
            this.createGame();
          }
        },{
          text: 'JOIN with BettingGame ID',
          handler: () => {
            console.log('Add with BettingGame ID clicked');
            this.addGameWithId();
          }
        },{
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // Enter Game ID
  addGameWithId() {
    let prompt = this.alertCtrl.create({
      title: 'BettingGame ID',
      message: "Enter the BettingGame ID shared by your friend",
      inputs: [
        {
          name: 'bettingGameId',
          placeholder: 'BettingGame ID'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: data => {
            console.log('Add clicked');
            console.log('BettingGame ID entered: ' + data.bettingGameId);
          }
        }
      ]
    });
    prompt.present();
  }

  // Create New Game
  createGame() {
    let alert = this.alertCtrl.create();
    alert.setTitle('NEW BettingGame');
    alert.setMessage('Create YOUR OWN BettingGame!')

    alert.addInput({
      type: 'text',
      name: 'gameId',
      label: 'Enter the name of your BettingGame',
      placeholder: 'BettingGame Name'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Add',
      handler: data => {
        this.account.gameId = data.gameId;
        console.log(this.account);
        // endpoint for creating new game
        this.games.add_bettingGame(this.account).subscribe((resp) => {
          // New game created
          if (resp['status'] == 'success') {
            let toast = this.toastCtrl.create({
              message: "Success, New game was created!",
              duration: 3000,
              position: 'bottom'
            });
            toast.present();
          }
          // else if other errors TODO
        }, (err) => {
          // Unable to create new game
          let toast = this.toastCtrl.create({
            message: "Error. Please check your connection.",
            duration: 3000,
            position: 'bottom'
          });
          toast.present();
        });
      }
    });
    alert.present();
  }

  ionViewDidLoad() {
    console.log('HomePage loaded');
  }

}
