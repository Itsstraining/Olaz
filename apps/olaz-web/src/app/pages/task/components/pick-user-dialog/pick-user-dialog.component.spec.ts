import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickUserDialogComponent } from './pick-user-dialog.component';

describe('PickUserDialogComponent', () => {
  let component: PickUserDialogComponent;
  let fixture: ComponentFixture<PickUserDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PickUserDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PickUserDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
