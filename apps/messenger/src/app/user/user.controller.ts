/* eslint-disable no-empty */
/* eslint-disable @typescript-eslint/no-empty-function */
import { EmailValidator } from '@angular/forms';
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
    @Get('suggest-user')
    async suggestUsers(@Query('email') email: string) {
        const users: any = await this.UserService.suggestUsers()
        const userSuggests = []
        for (let i = 0; i < users.length; i++) {
            if (i > 4) {
                return userSuggests
            }
            userSuggests.push(users[i])
        }
        const newArr = users.filter(
            (user) => {
                return user.email
                    .toLocaleLowerCase()
                    .includes(email.toLocaleLowerCase())
            })
        return newArr
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
    addFriend(@Body() body) {
        try {
            return this.UserService.sendRequest(body.frID, body.myID)
        }
        catch (error) {
            return new HttpException(error.message, HttpStatus.BAD_REQUEST)
        }
    }

    @Get('get-email')
    async gerUser(@Query('email') email: string) {
        const users: any = await this.UserService.getUserByEmail()
        const newArr = users.filter(
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
