/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';
import { TodoService } from '../../../services/task/todo/todo.service';
import { Todo } from '../../../models/todo.model';

@Component({
  selector: 'olaz-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss']
})
export class TodoComponent implements OnInit {

 
  todos: Todo[] = []
  showValidationErrors!: boolean;

  constructor(private todoService: TodoService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.todos = this.todoService.getAllTodos()
  }
  
  onFormSubmit(form: NgForm) {
    console.log("FORM SUBMITTED")
    console.log(form)
    
    if (form.invalid) return this.showValidationErrors = true
    this.todoService.addTodo(new Todo(form.value.text))

    this.showValidationErrors = false
    form.reset(); return; 
  }

  toggleCompleted(todo: Todo ) {
    //set todo to completed
    todo.completed = !todo.completed;
  }

  editTodo(todo: Todo) {
    //we need 
    // - index of to do
    // - user needs to enter new updated information

    const index = this.todos.indexOf(todo)

    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo
    });

    dialogRef.afterClosed().subscribe((result) => {
      if(result) {
        this.todoService.updateTodo(index, result)
      }
    })
    // this.dataService.updateTodo()
  }
  deleteTodo(todo: Todo) {
    const index = this.todos.indexOf(todo)
    this.todoService.deleteTodo(index)
  }


}
