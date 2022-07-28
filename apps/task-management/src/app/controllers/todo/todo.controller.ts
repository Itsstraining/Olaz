/* eslint-disable @typescript-eslint/no-explicit-any */
import { Body, Controller, Delete, Get, Param, Post, Put,  } from '@nestjs/common';
import { TodoService } from '../../services/todo/todo.service';

@Controller('todo')
export class TodoController {
    constructor(private todoService : TodoService){}
    @Get('getTodoDetail/:todoId')
    async getAll(@Param() {todoId}): Promise <any>{
        return this.todoService.getTodoDetail(todoId);
    }
    @Post()
    async createTodo(@Body() data: any ){
        try{
            await this.todoService.create(data.newTask );
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
            const result = await this.todoService.update(body.updateTask);
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
        // console.log(data.id)
        try {
            const result = this.todoService.delete(data.todo);
        return {
            message: "Delete Successful",
            retu: result
        }
        }catch(err){
            return{
                message: "Delete Faile",
                retu: err.toString()
            }
        }
        
    }   
}

