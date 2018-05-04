import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GroupStagePage } from '../pages/group-stage/group-stage';
import { WelcomePage } from '../pages/welcome/welcome';
import { LogoutPage } from '../pages/logout/logout';
import {SettingsPage} from "../pages/settings/settings";
import {ScreenOrientation} from "@ionic-native/screen-orientation";

@Component({
  templateUrl: 'app.html'
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  pages: Array<{title: string, icon: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // Menu pages
    this.pages = [
      { title: 'Your BettingGames', icon: 'game-controller-a', component: HomePage },
      { title: 'Scores and Schedule', icon: 'calendar', component: ListPage },
      { title: 'Group Standings', icon: 'list-box', component: GroupStagePage },
      { title: 'Settings', icon: 'settings', component: SettingsPage },
      { title: 'Logout', icon: 'log-out', component: LogoutPage }
    ];

  }

  // initializing the App
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  // open selected page from the menu
  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
