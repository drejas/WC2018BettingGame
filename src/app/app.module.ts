import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpClientModule } from '@angular/common/http';
import { Camera } from '@ionic-native/camera';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { GroupStagePage } from '../pages/group-stage/group-stage';
import { WelcomePage } from '../pages/welcome/welcome';
import { LogoutPage } from '../pages/logout/logout';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { User } from '../providers/providers';
import { Api } from '../providers/providers';
import { Games } from '../providers/providers';
import { IonicStorageModule } from '@ionic/Storage';
import { ScreenOrientation } from '@ionic-native/Screen-orientation';
import { SettingsPage } from "../pages/settings/settings";
import { GameStandingsPage } from "../pages/game-standings/game-standings";
import { GameStandingsPageModule } from "../pages/game-standings/game-standings.module";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { GroupStagePageModule } from "../pages/group-stage/group-stage.module";
import { WelcomePageModule } from "../pages/welcome/welcome.module";
import { LogoutPageModule } from "../pages/logout/logout.module";
import { SettingsPageModule } from "../pages/settings/settings.module";
import { AdmobFreeProvider } from '../providers/providers';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpClientModule,
    GameStandingsPageModule,
    GroupStagePageModule,
    WelcomePageModule,
    LogoutPageModule,
    SettingsPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    GroupStagePage,
    WelcomePage,
    LogoutPage,
    SettingsPage,
    GameStandingsPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    User,
    Api,
    Games,
    Camera,
    FileTransfer,
    FileTransferObject,
    AdmobFreeProvider,
    File,
    ScreenOrientation,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
