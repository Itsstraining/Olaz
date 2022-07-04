/* eslint-disable @typescript-eslint/no-empty-function */
import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from '../../services/user/user.service';
@Controller('user')
export class UserController {

    constructor(
        private UserService: UserService
    ) { }

    @Get('get-all')
    gerUser(@Query('email') email: string){
        const users = this.UserService.getUserByEmail()
        // for(let i = 0; i<users.length; i++){
        //     if(users[i].email == email ){
        //         return users[i];
        //     }
        // }
        // return "Không có kết quả nào!"
        // const newArr =  users.some( ai => ai.email.includes(email));
        const newArr =  users.includes({
            email: email
        })
         return newArr;
    }
}
