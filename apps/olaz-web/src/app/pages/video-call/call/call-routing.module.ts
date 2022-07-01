import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoCallComponent } from '../components/video-call/video-call.component';
import { CallComponent } from './call.component';

const routes: Routes = [{ path: '', component: CallComponent },
{ path: 'call', component: VideoCallComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CallRoutingModule { }
