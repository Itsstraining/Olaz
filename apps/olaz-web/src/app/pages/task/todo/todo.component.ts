/* eslint-disable @typescript-eslint/no-explicit-any */
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
import { UserService } from '../../../services/user.service';
import {
  docSnapshots,
  Firestore,
  doc,
  FieldValue,
  updateDoc,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';
import { update } from '@angular/fire/database';

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
    },
    {
      value: 'To do',
      status: false,
    },
    {
      value: 'Done',
      status: false,
    },
  ];

  todos: any[] = [];
  currentList = 'All';
  showValidationErrors!: boolean;
  checkedAll: boolean = false;
  appear: any;
  tempTodos: any;
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
                    this.todos.unshift(tempTodo);
                  }
                  {
                    this.todos[i] = tempTodo;
                  }
                }
              });
            }
          }
        }
      }
    });
  }

  toggleList(title: any) {
    this.currentList = title.value;
    console.log(this.currentList);
  }

  // addNew() {
  //   if (this.newTaskTitle == '') {
  //     alert('You have to fill the task title!!');
  //     return;
  //   } else {
  //     const temp = {
  //       id: Date.now().toString(),
  //       title: this.newTaskTitle,
  //       description: '',
  //       deadline: Date.now(),
  //       status: 0,
  //       assignee: '',
  //       reporter: '',
  //       priority: 0,
  //       createdBy: this.userService.user.id,
  //       createdDate: Date.now(),
  //       updatedDate: Date.now(),
  //     };
  //     this.todo.push(temp);
  //     this.TaskService.createTask(temp, this.currentRoomId).subscribe(
  //       (data) => this.openSnackBar(data)
  //     );
  //     this.newTaskTitle = '';
  //   }
  //   this.taskListFull.length = 0;
  // }

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
    this.todos.push(temp);
    return;
  }

  toggleCompleted(todo: any) {
    //set todo to completed
    todo.status = !todo.status;
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
        this.todoService.updateTodo(result);
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
