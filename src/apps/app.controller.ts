import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('google')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('redirect')
  googleAuthRedirect(@Req() req) {
    return this.appService.googleLogin(req);
  }
}
