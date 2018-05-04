import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

@Injectable()
export class Games {

  constructor(public api: Api) { }
  /**
   * Send a GET request to games endpoint to get games list with scores
   */
  get_games() {
    let seq = this.api.get('wc_get_games.php').share();

    seq.subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a GET request to groups endpoint to get groups list with standings
   */
  get_groups() {
    let seq = this.api.get('wc_get_groups.php').share();

    seq.subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to add_bettingGame endpoint to add new BettingGame
   */
  add_bettingGame(gameData: any) {
    let seq = this.api.post('wc_add_bettingGame.php', JSON.stringify(gameData)).share();

    seq.subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to get_bettingGames endpoint to get all users BettingGames
   */
  get_bettingGames(gameData: any) {
    let seq = this.api.post('wc_get_bettingGames.php', JSON.stringify(gameData)).share();

    seq.subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to get_bettingGames endpoint to get all users BettingGames
   */
  get_gameStandings(gameData: any) {
    let seq = this.api.post('wc_get_gameStandings.php', JSON.stringify(gameData)).share();

    seq.subscribe((res: any) => {
      console.log(res);
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }


}
