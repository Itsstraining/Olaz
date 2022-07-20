import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import {RoomController} from './room/room.controller'
import { RoomService } from './room/room.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, MessageController, RoomController],
  providers: [AppService, UserService, MessageService, RoomService],
})
export class AppModule { }
