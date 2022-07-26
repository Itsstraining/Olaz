import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { EditTodoDialogComponent } from '../pages/task/todo/components/edit-todo-dialog/edit-todo-dialog.component';
import { TodoItemComponent } from '../pages/task/todo/components/todo-item/todo-item.component';


@NgModule({
    declarations:[
        EditTodoDialogComponent, TodoItemComponent
    ],
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports:[
        FormsModule,
        ReactiveFormsModule,
        CommonModule,

        EditTodoDialogComponent,
        TodoItemComponent
    ]
})

export class ShareModule {}