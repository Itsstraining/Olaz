import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { MessageService } from '../message/message.service';

@Controller('message')
export class MessageController {
    
    constructor(
        private MessageService: MessageService
    ){ }

    @Post('send-message')
    sendMessage(@Body() body){
        try{
            console.log(body);
            return this.MessageService.sendMessage(body.content, body.image, body.type, body.userId, body.roomID, body.createdTime)
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
