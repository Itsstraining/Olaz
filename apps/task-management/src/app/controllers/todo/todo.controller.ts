/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Delete, Get, Param, Post, Put,  } from '@nestjs/common';
import { TodoService } from '../../services/todo/todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoService : TodoService){}
    @Get('getAll/:userId')
    async getAll(@Param() {userId}): Promise <any>{
        return this.todoService.getAll(userId);
    }
    @Post()
    async create(@Body() data: any ){
        try{
            await this.todoService.create(data.newTask, data.userId);
            return {message :"Create Successful"} 
        }catch(err){
            return {
                message: "Create Failed!",
                error: err.toString() 
            }
        }
         
    }
    @Put()
    async update(@Body() body:any){
        try{
            const result = await this.todoService.update(body.updateTask,body.userId,body.taskId);
            return {
                message: "Successful",
                retu: result
            }
        }catch(err){
            return{
                message: "Faile",
                retu: err.toString()
            }
    }
    }
    @Delete()
    async delete(@Body() data: any){
        const result = this.todoService.delete(data.userId,data.taskId);
        return result;
    }   
}

