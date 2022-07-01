/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { TodoService } from '../../services/todo/todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoService : TodoService){}
    @Get('all')
    async getAll(@Body() userId): Promise <any>{
        return this.todoService.getAll(userId);
    }
    @Post()
    async create(@Body() data: any ){
        try{
            await this.todoService.create(data);
            return {message :"create Successful"} 
        }catch(err){
            return {
                message: "create Faile",
                error: err.toString() 
            }
        }
         
    }
    @Put()
    async update(@Body() body:any){
        try{
            const result = await this.todoService.update(body.data,body.task);
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
    async delete(@Query() task: any){
        const result = this.todoService.delete(task);
        return result;
    }
}

