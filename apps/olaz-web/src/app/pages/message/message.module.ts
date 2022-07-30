import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MessageRoutingModule } from './message-routing.module';
import { DialogFriendComponent } from './components/dialog-friend/dialog-friend.component';
import { DialogFowardComponent } from './components/dialog-foward/dialog-foward.component';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MaterialModule } from '@olaz/material';
import { MessageComponent } from './message.component';
import { MatIconModule } from '@angular/material/icon';
import { RejectAddComponent } from './components/reject-add/reject-add.component';
import { CreateRoomComponent } from './components/dialog-create-room/create-room.component';

import { MatCheckboxModule } from '@angular/material/checkbox';
import { ShareModule } from '../../modules/share.module';
@NgModule({
  declarations: [
    MessageComponent,
    DialogFowardComponent,
    DialogFriendComponent,
    RejectAddComponent,
    CreateRoomComponent,
  ],
  imports: [
    CommonModule,
    MessageRoutingModule,
    MatIconModule,
    MaterialModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatListModule,
    FormsModule,
    MatCheckboxModule,
    ShareModule
  ],
})
export class MessageModule { }
