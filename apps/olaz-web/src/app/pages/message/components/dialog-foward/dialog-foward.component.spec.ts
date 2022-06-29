import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFowardComponent } from './dialog-foward.component';

describe('DialogFowardComponent', () => {
  let component: DialogFowardComponent;
  let fixture: ComponentFixture<DialogFowardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogFowardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFowardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
