/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Todo } from '../../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  todos: Todo[] = [
    new Todo('This is a test!', false),
    new Todo('Has been done!', true)
  ]

  constructor() { }
  getAllTodos() {
    return this.todos
  }

  addTodo(todo: Todo) {
    this.todos.push(todo)
  }

  updateTodo(index: number, updateTodo: Todo) {
    this.todos[index] = updateTodo 
  }

  deleteTodo(index: number) {
    this.todos?.splice(index, 1)
    // this.todos = this.todos?.slice(0, index).concat(this.todos?.slice(index+1));
    // console.log(this.todos)
  }
}
