/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';
import { TodoService } from '../../../services/task/todo/todo.service';
import { Todo } from '../../../models/todo.model';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'olaz-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  todos: Todo[] = [];
  showValidationErrors!: boolean;
  checkedAll: boolean = false;
  constructor(private todoService: TodoService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos();
  }

  onFormSubmit(form: NgForm) {
    console.log('FORM SUBMITTED');
    console.log(form);

    if (form.invalid) return (this.showValidationErrors = true);
    this.todoService.addTodo(new Todo(form.value.text));

    this.showValidationErrors = false;
    form.reset();
    return;
  }

  toggleCompleted(todo: Todo) {
    //set todo to completed
    todo.isCompleted = !todo.isCompleted;
  }

  toggleCompleteAll(){
    if(!this.checkedAll){
      for(let i = 0; i < this.todos.length; i++){
        if(this.todos[i].isCompleted == false){
          this.todos[i].isCompleted = true;
        }
      }
    }else{
      for(let i = 0; i < this.todos.length; i++){
        this.todos[i].isCompleted = false;
      }
    }
    this.checkedAll = !this.checkedAll;
  }

  deleteMultiTask(){
    for(let i = 0; i < this.todos.length; i++){
      if(this.todos[i].isCompleted == true){
        console.log(this.todos[i])
        this.todoService.deleteTodo(i);
      }
    }
  }

  editTodo(todo: Todo) {
    const index = this.todos.indexOf(todo);

    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService.updateTodo(index, result);
      }
    });
    // this.dataService.updateTodo()
  }

  deleteTodo(todo: Todo) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const index = this.todos.indexOf(todo);
        this.todoService.deleteTodo(index);
      }
    });
  }

}
