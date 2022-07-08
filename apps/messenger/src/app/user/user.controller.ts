/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { UserService } from '../user/user.service';
@Controller('user')
export class UserController {

    constructor(
        private UserService: UserService
    ) { }

    @Get('get-all-users')
    async getUsers() {
        try {
            return await this.UserService.getUsers();
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('add-friend')
    async toggleRequest(@Body() body) {
        try {
            return this.UserService.toggleRequest(body.check, body.frID, body.myID);
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Post('send-request')
    addFriend(@Body() body){
        try{
            return this.UserService.sendRequest(body.frID, body.myID)
        }
        catch(error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('get-email')
    async gerUser(@Query('email') email: string) {
        const users: any = await this.UserService.getUserByEmail()
        // for(let i = 0; i<users.length; i++){
        //     if(users[i].email == email ){
        //         return users[i];
        //     }
        // }
        // return "Không có kết quả nào!"
        // const newArr =  users.some( ai => ai.email.includes(email));
        const newArr =  users.filter(
            (user) => {
                return user.email
                    .toLocaleLowerCase()
                    .includes(email.toLocaleLowerCase())
            })
        return newArr;
    }

    @Get(':id')
    async getUserById(@Param('id') id: string) {
        try {
            return await this.UserService.getUserById(id);
        } catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }


}
