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
    this.todos.length = 0;
    docSnapshots(
      doc(this.firestore, 'users', this.userService.user.id)
    ).subscribe(async (result) => {
      if (!result.metadata.fromCache) {
        this.todos.length = 0;

        this.tempTodos = result.data();

        if (this.tempTodos != undefined) {
          if (this.tempTodos['todos'].length != 0) {
            for (let i = 0; i < this.tempTodos['todos'].length; i++) {
              docSnapshots(
                doc(this.firestore, 'todos', this.tempTodos['todos'][i])
              ).subscribe((data) => {
                const tempTodo = data.data();
                if (tempTodo) {
                  const index = this.tempTodos['todos'].findIndex(
                    (value: any) => value['id'] == tempTodo['id']
                  );
                  if (!index) {
                    this.todos.push(tempTodo);
                  }
                  {
                    this.todos[i] = tempTodo;
                  }
                }
                this.checkAllComplete();
                this.toggleList(this.currentList);
              });
            }
            this.todoShow = this.todos;
          }
        }
      }
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
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].status == true) {
        this.todoService.deleteTodo(i);
      }
    }
    this.todos.length = 0;
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
