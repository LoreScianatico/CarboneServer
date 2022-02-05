import { Controller, Get, Res, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('report')
  getReport(@Query('toPdf') toPdf: boolean, @Res() response: Response): void { //warning! Express.js specific!
    this.appService.printReport(toPdf, response);
  }
}
