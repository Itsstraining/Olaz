import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from '../../services/task/task.service';
@Controller('task')
export class TaskController {
    constructor(private TaskService : TaskService){}
    // CRUD FOR TASK LIST=========


    @Post()
    async createTaskList(@Body() data: any){
        try{
            await this.TaskService.create(data.roomId, data.newTask);
            return{message: "Create successful!"} 
        }catch(err){
            return{
                message:"Create failed!",
                error: err
            }
        } 
    }

    @Put()
    async update(@Body() data: any){
        try{
            await this.TaskService.update(data.roomId, data.updateTask);
            return {message: "Update successful!"}
        }catch(err){
            return {
                message: "Update failed!",
                error: err
            }
        }
    }

    @Delete()
    async delete(@Body() data: any){
        try{
            await this.TaskService.delete(data.roomId, data.taskId);
            return {message: "Delele successful!"}
        }catch(err){
            return {
                message: "Delele failed!",
                error: err
            }
        }
    }
}
