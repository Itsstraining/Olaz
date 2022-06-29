import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VideoCallComponent } from './pages/video-call/components/video-call/video-call.component';

const routes: Routes = [
    { path: 'm', loadChildren: () => import('./pages/message/message.module').then(m => m.MessageModule) },
    {path: 'calls/:id', component: VideoCallComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
