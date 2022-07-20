import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TaskRoutingModule } from './task-routing.module';
import { TaskComponent } from './task.component';
import { MaterialModule } from '@olaz/material';
import { SingleTaskComponent } from '../components/single-task/single-task.component';
import { DetailTaskComponent } from '../components/detail-task/detail-task.component';


@NgModule({
  declarations: [
    TaskComponent,
    SingleTaskComponent,
    DetailTaskComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    MaterialModule,
  ],
  exports:[
    SingleTaskComponent,
    DetailTaskComponent
  ]
})
export class TaskModule { }
