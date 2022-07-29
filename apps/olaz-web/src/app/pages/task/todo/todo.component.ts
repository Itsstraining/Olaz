/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @angular-eslint/no-empty-lifecycle-method */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { EditTodoDialogComponent } from './components/edit-todo-dialog/edit-todo-dialog.component';
import { TodoService } from '../../../services/task/todo/todo.service';
import { DeleteDialogComponent } from '../../../components/delete-dialog/delete-dialog.component';
import { UserService } from '../../../services/user.service';
import {
  docSnapshots,
  Firestore,
  doc,
  collection,
  query,
  onSnapshot,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'olaz-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.scss'],
})
export class TodoComponent implements OnInit {
  arr = [
    {
      value: 'All',
      status: true,
      id: 0,
    },
    {
      value: 'To do',
      status: false,
      id: 1,
    },
    {
      value: 'Done',
      status: false,
      id: 2,
    },
  ];

  todos: any[] = [];
  currentList = this.arr[0];
  showValidationErrors!: boolean;
  checkedAll: boolean = false;
  appear: any;
  tempTodos: any;
  todoShow: any[] = [];
  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    public userService: UserService,
    private _snackBar: MatSnackBar,
    private firestore: Firestore
  ) {}

  ngOnInit(): void {
    // this.todos = this.todoService.getAllTodos();
    this.userService.user$.subscribe((data) => {
      if (!data) return;
      this.appear = data;
      this.getTodoList();
    });
  }

  getTodoList() {
    const q = query(collection(this.firestore, `users`, `${this.appear.id}/todos`));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      // snapshot.docs.map(data => this.taskListFull.push(data.data()))
      snapshot.docChanges().forEach((change) => {
        if (change.type === 'added') {
          this.todos.unshift(change.doc.data());
        }
        if (change.type === 'modified') {
          for(let i = 0; i < this.todos.length; i++){
            if(this.todos[i].id == change.doc.data()['id']){
              this.todos[i] = change.doc.data();
            }
          }
        }
        if (change.type === 'removed') {
          const index = this.todos.findIndex((value: any) => value['id'] == change.doc.data()['id']);
          this.todos.splice(index, 1);
        }
      });
      this.todoShow= this.todos;
      this.checkAllComplete()
    });
  }

  toggleList(title: any) {
    this.currentList = title;
    if(title.id ==1){
      this.todoShow = this.todos.filter((todo) => todo.status == false);
    }else if(title.id == 2){
      this.todoShow = this.todos.filter((todo) => todo.status == true);
    }else{
      this.todoShow = this.todos;
    }
  }

  openSnackBar(message: any) {
    this._snackBar.open(message.message, '', {
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }

  onFormSubmit(form: NgForm) {
    const temp = {
      id: Date.now().toString(),
      title: form.value.text,
      status: false,
      createdDate: Date.now(),
      createdBy: this.appear.id,
    };
    if (form.invalid) return (this.showValidationErrors = true);
    this.todoService
      .addTodo(temp)
      .subscribe((message) => this.openSnackBar(message));
    this.showValidationErrors = false;
    form.reset();
    return;
  }

  toggleCompleted(todo: any) {
    //set todo to completed
    console.log(todo.status)
    const temp = {
      ...todo,
      status: !todo.status,
    };
    this.checkAllComplete();
    this.todoService.updateTodo(temp).subscribe((message) => message);
  }

  toggleCompleteAll() {
    if (!this.checkedAll) {
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].status == false) {
          this.todos[i].status = true;
        }
      }
    } else {
      for (let i = 0; i < this.todos.length; i++) {
        this.todos[i].status = false;
      }
    }
    this.checkedAll = !this.checkedAll;
    this.toggleList(this.currentList);
  }

  checkAllComplete() {
    let count = 0;
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].status == true) {
        count++;
      }
    }
    if (count == this.todos.length) {
      this.checkedAll = true;
    } else {
      this.checkedAll = false;
    }
  }

  deleteMultiTask() {
    console.log('hi')
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].status == true) {
        this.todoService.deleteTodo(this.todos[i]);
      }
    }
  }

  editTodo(todo: any) {
    const index = this.todos.indexOf(todo);

    const dialogRef = this.dialog.open(EditTodoDialogComponent, {
      width: '700px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService
          .updateTodo(result)
          .subscribe((message) => this.openSnackBar(message));
      }
    });
    // this.dataService.updateTodo()
  }

  deleteTodo(todo: any) {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '500px',
      data: todo,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.todoService
          .deleteTodo(result)
          .subscribe((message) => this.openSnackBar(message));
      }
    });
  }
}
