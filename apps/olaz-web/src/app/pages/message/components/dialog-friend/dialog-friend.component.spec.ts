import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogFriendComponent } from './dialog-friend.component';

describe('DialogFriendComponent', () => {
  let component: DialogFriendComponent;
  let fixture: ComponentFixture<DialogFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogFriendComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DialogFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
