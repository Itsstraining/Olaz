import { Body, Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getData() {
    return this.appService.getData();
  }
  @Post('add-Item')
  addItem(@Body() item: any) {

    return this.appService.addItem(item);
  }
  
  @Delete('delete-Item')
  async delDoc(@Query() query: any) {  
    if(await this.appService.delDoc(query.id)){
      return 'You had deleted this item';
    }else{
      return 'This item hasn`t been deleted'
    }

  }
}