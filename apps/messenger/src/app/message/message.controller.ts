import { Body, Controller, HttpException, HttpStatus, Post , Headers} from '@nestjs/common';
import { MessageService } from '../message/message.service';

@Controller('message')
export class MessageController {
    
    constructor(
        private MessageService: MessageService
    ){ }

    @Post('send-message')
    sendMessage(@Body() body, @Headers() headers){
        try{
            console.log(body);
            const _token = headers.authorization;
            if(_token){
            console.log(_token);
                
            }
            return this.MessageService.sendMessage(body.content, body.image, body.type, body.userId, body.roomID, body.createdTime,_token)
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }
}
