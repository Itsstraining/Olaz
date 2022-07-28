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
import { docSnapshots, Firestore, doc } from '@angular/fire/firestore';
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

  constructor(
    private todoService: TodoService,
    private dialog: MatDialog,
    public userService: UserService,
    private _snackBar: MatSnackBar,
    private firestore: Firestore,
  ) {}

  ngOnInit(): void {
    // this.todos = this.todoService.getAllTodos();
    this.userService.user$.subscribe((data) => {
      if (!data) return;
      this.appear = data;
    });
    this.getTodoList();
  }

  getTodoList() {
    docSnapshots(
      doc(this.firestore, 'users', this.userService.user.id)
    ).subscribe(async (result) => {
      if (!result.metadata.fromCache) {
        this.todos.length = 0;
        const temp = result.data();
        if(temp != undefined){
          if (temp['todos'].length != 0) {
            for (let i = 0; i < temp['todos'].length; i++) {
              docSnapshots(
                doc(this.firestore, 'todos', temp['todos'][i])
              ).subscribe((data) => {
                  const tempTodo = data.data();
                  const index = temp['todos'].findIndex(
                    (value:any) => value['id'] == tempTodo
                  );
                  if (!index) {
                    this.todos.unshift(tempTodo);
                  }
                  {
                    this.todos[i] = tempTodo;
                  }
              })
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
    this._snackBar.open(message.message, '',{
      duration: 2000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      
    });
  }

  onFormSubmit(form: NgForm) {

    // if (form.invalid) return (this.showValidationErrors = true);
    // this.todoService.addTodo(new Todo(form.value.text));
    if (form.invalid) return (this.showValidationErrors = true);
    this.todoService.addTodo({
      title: form.value.text,
      status: false,
      createdDate: Date.now(),
      createdBy: this.appear.id
    }).subscribe((message) => this.openSnackBar(message));

    this.showValidationErrors = false;
    form.reset();
    return;
  }

  toggleCompleted(todo: Todo) {
    //set todo to completed
    todo.isCompleted = !todo.isCompleted;
  }

  toggleCompleteAll() {
    if (!this.checkedAll) {
      for (let i = 0; i < this.todos.length; i++) {
        if (this.todos[i].isCompleted == false) {
          this.todos[i].isCompleted = true;
        }
      }
    } else {
      for (let i = 0; i < this.todos.length; i++) {
        this.todos[i].isCompleted = false;
      }
    }
    this.checkedAll = !this.checkedAll;
  }

  deleteMultiTask() {
    for (let i = 0; i < this.todos.length; i++) {
      if (this.todos[i].isCompleted == true) {
        console.log(this.todos[i]);
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
