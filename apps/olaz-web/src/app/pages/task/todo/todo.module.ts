import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TodoRoutingModule } from './todo-routing.module';
import { TodoComponent } from './todo.component';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { MatDialogModule } from '@angular/material/dialog';
import { ShareModule } from '../../../modules/share.module';


@NgModule({
  declarations: [
    TodoComponent,
  ],
  imports: [
    CommonModule,
    TodoRoutingModule,
    // BrowserAnimationsModule,
    MatDialogModule,
    ShareModule,
    FormsModule
  ],
  providers: [],
  bootstrap: []
})
export class TodoModule { }
