import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTodoDialogComponent } from './edit-todo-dialog.component';

describe('EditTodoDialogComponent', () => {
  let component: EditTodoDialogComponent;
  let fixture: ComponentFixture<EditTodoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditTodoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTodoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
