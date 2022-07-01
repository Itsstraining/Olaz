import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoController } from './controllers/todo/todo.controller';
import { TodoService } from './services/todo/todo.service';
import { TaskService } from './services/task/task.service';
import { TaskController } from './controllers/task/task.controller';

@Module({
  imports: [],
  controllers: [AppController, TodoController, TaskController],
  providers: [AppService, TodoService, TaskService],
})
export class AppModule {}
