import {
  Controller,
  Body,
  Get,
  Req,
  UseGuards,
  Res,
  Post,
} from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { Response } from 'express';
import { CreateEventDto } from './dto/calendar.dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly googleEventService: CalendarService) {}

  @Get('auth')
  async createGoogleCalendar(@Res() res: Response) {
    const authUrl = (await this.googleEventService.createUrl()) as string;
    res.redirect(authUrl);
  }

  @Get('summary')
  async getCalendarNames() {
    const calendarNames = await this.googleEventService.getCalendarNames();
    return calendarNames;
  }

  @Post('create-event')
  async createEventPost(@Body() eventData: CreateEventDto) {
    try {
      const createdEvent =
        await this.googleEventService.createEventPost(eventData);
      return createdEvent;
    } catch (error) {
      return { error: 'An error occurred while creating the event.' };
    }
  }
}
