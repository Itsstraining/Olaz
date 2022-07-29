import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MessageComponent } from './message.component';

const routes: Routes = [
  {
    path: '', component: MessageComponent,
    children:[
      // { path: 'task', loadChildren: () => import('../task/task/task.module').then(m => m.TaskModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MessageRoutingModule { }
