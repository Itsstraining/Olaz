import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTodoDialogComponent } from '../pages/task/todo/components/edit-todo-dialog/edit-todo-dialog.component';
import { TodoItemComponent } from '../pages/task/todo/components/todo-item/todo-item.component';
import { DeleteDialogComponent } from '../components/delete-dialog/delete-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { SnackBarComponent } from '../components/snack-bar/snack-bar.component';

@NgModule({
  declarations: [
    DeleteDialogComponent,
    EditTodoDialogComponent,
    TodoItemComponent,
    SnackBarComponent
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
    SnackBarComponent
  ],
})
export class ShareModule {}
