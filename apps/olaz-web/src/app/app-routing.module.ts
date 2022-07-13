import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/video-call/components/login/login.component';


const routes: Routes = [
    // { path: '', component: AppComponent },
    { path: 'todo', loadChildren: () => import('./pages/task/todo/todo.module').then(m => m.TodoModule) },
    { path: 'task', loadChildren: () => import('./pages/task/task/task.module').then(m => m.TaskModule) },
    {
        path:'',
        redirectTo: '/m', pathMatch: 'full'
    },
    { path: 'm/:roomId', loadChildren: () => import('./pages/message/message.module').then(m => m.MessageModule) },
    { path: 'call', loadChildren: () => import('./pages/video-call/call/call.module').then(m => m.CallModule) },
    { path: 'profile', loadChildren: () => import('./pages/profile/profile/profile.module').then(m => m.ProfileModule) },
    { path: 'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
