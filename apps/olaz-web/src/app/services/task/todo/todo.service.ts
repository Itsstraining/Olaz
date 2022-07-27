/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@angular/core';
import { Todo } from '../../../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {


  todos: Todo[] = [
    new Todo('This is a test!', false),
    new Todo('Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto facilis provident perferendis officiis sapiente quam doloremque numquam! Eveniet, dolorum vero culpa dolore nam, quasi beatae placeat explicabo repellat assumenda libero!', true)
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
  }
}
