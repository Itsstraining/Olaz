import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { MaterialModule } from '@olaz/material';
import { SingleTaskComponent } from '../components/single-task/single-task.component';


@NgModule({
  declarations: [
    TaskComponent,
    SingleTaskComponent,
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule
  ],
  exports:[
    SingleTaskComponent,
  ]
})
export class TaskModule { }
