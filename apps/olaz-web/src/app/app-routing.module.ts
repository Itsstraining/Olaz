import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    // { path: '', component: AppComponent },
    { path: 'todo', loadChildren: () => import('./pages/task/todo/todo.module').then(m => m.TodoModule) },
    { path: 'task', loadChildren: () => import('./pages/task/task/task.module').then(m => m.TaskModule) },
    {
        path:'',
        redirectTo: '/todo', pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { initialNavigation: 'enabledBlocking' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }
