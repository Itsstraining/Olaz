/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
import { Component, Inject, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Todo } from '../../../../../models/todo.model';
@Component({
  selector: 'olaz-edit-todo-dialog',
  templateUrl: './edit-todo-dialog.component.html',
  styleUrls: ['./edit-todo-dialog.component.scss']
})
export class EditTodoDialogComponent implements OnInit {

  constructor( public dialogRef: MatDialogRef<EditTodoDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public todo: any) { }

  ngOnInit(): void {
  }
  close() {
    this.dialogRef.close()
  }

  onFormSubmit(form: NgForm) {
    if (form.invalid) return
    
    const updatedTodo = {
      ...this.todo,
      title: form.value.text
    }

    this.dialogRef.close(updatedTodo)
  }
}
