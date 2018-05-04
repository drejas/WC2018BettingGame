import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GroupStagePage } from './group-stage';

@NgModule({
  declarations: [
    GroupStagePage,
  ],
  imports: [
    IonicPageModule.forChild(GroupStagePage),
  ],
  exports: [
    GroupStagePage,
  ]
})
export class GroupStagePageModule {}
