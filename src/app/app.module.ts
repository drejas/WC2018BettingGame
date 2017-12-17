import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {GroupStagePage} from "../pages/group-stage/group-stage";
import {WelcomePage} from "../pages/welcome/welcome";
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { Games } from '../providers/providers';
import {IonicStorageModule} from '@ionic/Storage';
import { ScreenOrientation } from '@ionic-native/Screen-orientation';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    GroupStagePage,
    WelcomePage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    GroupStagePage,
    WelcomePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    User,
    Api,
    Games,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
