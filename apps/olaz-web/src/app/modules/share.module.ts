import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTodoDialogComponent } from '../pages/task/todo/components/edit-todo-dialog/edit-todo-dialog.component';
import { TodoItemComponent } from '../pages/task/todo/components/todo-item/todo-item.component';
import { DeleteDialogComponent } from '../components/navbar/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    EditTodoDialogComponent,
    TodoItemComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatDialogModule ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MatDialogModule,
    DeleteDialogComponent,
    EditTodoDialogComponent,
    TodoItemComponent,
  ],
})
export class ShareModule {}
