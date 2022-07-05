/* eslint-disable @typescript-eslint/no-empty-function */
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    user = [
        {
            "email": "trong.phamtranduc@gmail.com"
        },
        {
            "email": "tin.huynhhuu@gmail.com",
        },
        {
            "email": "xyz@gmail.com"
        }
    ]
    getUserByEmail(){
        return this.user;
    }
}
