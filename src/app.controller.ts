import { Body, Controller, Get, Post, Render, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';
import axios from 'axios';

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
    const { authResultCode, tid, clientId, amount } = body;
    const secretId = process.env.Secret_Key;
    // 결제사 인증 실패할 경우 예외 처리
    if (authResultCode !== '0000') res.render('fail');

    //const authBasic = btoa(`${clientId}:${secretId}`);
    const authBasic = `Basic ${Buffer.from(`${clientId}:${secretId}`).toString(
      'base64',
    )}`;
    console.log(authBasic);
    axios
      .post(
        `https://sandbox-api.nicepay.co.kr/v1/payments/${tid}`,
        {
          amount: parseInt(amount, 10),
        },
        {
          headers: {
            'Content-Type': 'application/json',
            // eslint-disable-next-line prettier/prettier
            Authorization: authBasic,
          },
        },
      )
      .then((data) => {
        console.log(data);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  @Get('fail')
  @Render('fail')
  failAuth(): any {
    return {
      errorMessage: '결제사 인증에 실패하였습니다.',
    };
  }
}
