import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller('payment')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  getHello(): any {
    return { message: this.appService.getHello() };
  }

  @Post('auth')
  paymentAuth(@Body() body: any, @Res() res: Response): any {
    const { authResultCode, tid } = body;
    // 결제사 인증 실패할 경우 예외 처리
    if (authResultCode !== '0000') res.redirect(301, '/payment/fail');

  }

  @Get('fail')
  @Render('fail')
  failAuth(): any {
    return {
      errorMessage: '결제사 인증에 실패하였습니다.',
    };
  }
}
