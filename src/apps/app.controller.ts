import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import * as requestIp from 'request-ip';

@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('redirect')
  googleAuthRedirect(@Req() req) {
    // const userIpAddress = requestIp.getClientIp(req);
    return this.appService.googleLogin(req);
  }
}
