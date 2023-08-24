import { Injectable, Body } from '@nestjs/common';
import { oauth2 } from 'googleapis/build/src/apis/oauth2';
import { CalendarService } from './calendar/calendar.service';

@Injectable()
export class AppService {
  constructor(private readonly calendarService: CalendarService) {}
  async googleLogin(req) {
    const data = await this.calendarService.getTokenAndLoggin(req.query.code);
    console.log(data);
  }
}
