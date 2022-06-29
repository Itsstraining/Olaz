import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectAddComponent } from './reject-add.component';

describe('RejectAddComponent', () => {
  let component: RejectAddComponent;
  let fixture: ComponentFixture<RejectAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RejectAddComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RejectAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
