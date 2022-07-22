/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get,Headers, Param  } from '@nestjs/common';
import { RoomService } from './room.service';
@Controller('room')
export class RoomController {

    constructor(private RoomService:RoomService){}
    @Get('check-room/:roomId')
    async checkUserInRoom(@Headers() headers, @Param() param){
        console.log(headers)
        console.log(param)
        const _token = headers.authorization;
        const result = await this.RoomService.checkToken(_token);
        if(!result){
            return false;
        }else{
            console.log("17::::::" + result)
            for(let i = 0; i<result.rooms.length; i++){
                if(result.rooms[i] === param.roomId){
                    return true;
                }
            }
            return false;
        }
    }
}
