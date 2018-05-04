import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GameStandingsPage } from './game-standings';

@NgModule({
  declarations: [
    GameStandingsPage
  ],
  imports: [
    IonicPageModule.forChild(GameStandingsPage),
  ],
  exports: [
    GameStandingsPage,
  ]
})
export class GameStandingsPageModule {}
