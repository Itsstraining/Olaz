import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { MaterialModule } from '@olaz/material';
import { ProfileComponent } from '../task/components/profile/profile.component';

@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    SidebarComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    MaterialModule
  ]
})
export class LayoutModule { }
