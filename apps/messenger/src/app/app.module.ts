import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessageController } from './message/message.controller';
import { MessageService } from './message/message.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';

@Module({
  imports: [],
  controllers: [AppController, UserController, MessageController],
  providers: [AppService, UserService, MessageService],
})
export class AppModule { }
