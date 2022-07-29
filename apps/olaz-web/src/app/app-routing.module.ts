import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/video-call/components/login/login.component';
import { AuthguardService } from './services/authguard.service';


const routes: Routes = [
    // { path: '', component: AppComponent },

    { path: '', component: LoginComponent },
    { path: 'ownspace', loadChildren: () => import('./pages/layout/layout.module').then(m => m.LayoutModule) },

    // {
    //     path:'',
    //     redirectTo: 'm/:roomId', pathMatch: 'full'
    // },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
