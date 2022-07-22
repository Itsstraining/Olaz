import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from '../../services/task/task.service';
@Controller('task-list')
export class TaskController {
    constructor(private TaskService : TaskService){}
    // CRUD FOR TASK LIST=========
    @Get()
    async getTaskList(@Body() data: any):Promise <any>{
        try {
            return await this.TaskService.getTaskList(data.roomsId);
        } catch (error) {
            return{
                message:"Cannot find",
                error: error
            }
        }
    }

    @Post()
    async createTaskList(@Body() data: any){
        try{
            await this.TaskService.createTaskList(data.roomsId);
            return{message: "Create Success"} 
        }catch(err){
            return{
                message:"Create Failed",
                error: err
            }
        } 
    }

    @Delete()
    async deleteTaskList(@Body() data: any){
        return await this.TaskService.deleteTaskList(data.roomsId);
    }

    // CRUD FOR TASK=========
    @Get('task')
    async getTaskDetail(@Body() data:any):Promise <any>{
        return this.TaskService.getTaskDetail(data.taskId);
    }
    @Post('task')
    async create(@Body() data : any){
        try{
            await this.TaskService.create(data.newTask, data.roomsId);
            return{message: "Create Success"} 
        }catch(err){
            return{
                message:"Create Failed",
                error: err
            }
        } 
    }
    @Put('task')
    async update(@Body() data: any ){
        try{
            await this.TaskService.update(data.updateTask, data.taskId);
            return {message: "Update Success"}
        }catch(err){
            return {
                message: "Update Failed",
                error: err
            }
        }
    }
    @Delete('task')
    async delete(@Body() data: any){
        return await this.TaskService.delete(data.roomsId, data.taskId);
    }
}
