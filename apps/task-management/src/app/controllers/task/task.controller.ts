import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { TaskService } from '../../services/task/task.service';
@Controller('task')
export class TaskController {
    constructor(private TaskService : TaskService){}
    @Get('getAll/:roomsId')
    async getAll(@Param() {roomsId}):Promise <any>{
        console.log(roomsId);
        return this.TaskService.getAll(roomsId);
    }
    @Post()
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
    @Put()
    async update(@Body() data: any ){
        try{
            await this.TaskService.update(data.updateTask, data.roomsId, data.taskId);
            return {message: "Update Success"}
        }catch(err){
            return {
                message: "Update Failed",
                error: err
            }
        }
    }
    @Delete()
    async delete(@Body() data: any){
        return await this.TaskService.delete(data.roomsId, data.taskId);
    }
}
