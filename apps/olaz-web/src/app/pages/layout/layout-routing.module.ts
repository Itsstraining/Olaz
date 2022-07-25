import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [{ path: '', component: LayoutComponent,
  children:[
    { path: 'todo', loadChildren: () => import('../task/todo/todo.module').then(m => m.TodoModule) },
    { path: 'task', loadChildren: () => import('../task/task/task.module').then(m => m.TaskModule) },

    { path: 'm/:roomId', loadChildren: () => import('../message/message.module').then(m => m.MessageModule) },
    { path: 'call', loadChildren: () => import('../video-call/call/call.module').then(m => m.CallModule) },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
