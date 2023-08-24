// google-event.service.ts
require('dotenv').config();
import { Injectable } from '@nestjs/common';
import { google, calendar_v3 } from 'googleapis';
import { CreateEventDto } from './dto/calendar.dto';

@Injectable()
export class CalendarService {
  readonly googleService = new google.auth.OAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });
  async createUrl() {
    return this.googleService.generateAuthUrl({
      access_type: 'offline',
      scope: ['https://www.googleapis.com/auth/calendar'],
    });
  }

  async getTokenAndLoggin(code: string) {
    const data = await this.googleService.getToken(code);
    this.googleService.setCredentials(data.tokens);
    console.log(data);
  }
  async createEventPost(eventData: CreateEventDto) {
    const calendar = google.calendar({
      version: 'v3',
      auth: this.googleService,
    });

    try {
      const eventResponse = await calendar.events.insert({
        calendarId: 'primary',
        auth: this.googleService,
        requestBody: {
          summary: eventData.summary,
          start: {
            dateTime: eventData.startDateTime,
            timeZone: 'Asia/Krasnoyarsk',
          },
          end: {
            dateTime: eventData.endDateTime,
            timeZone: 'Asia/Krasnoyarsk',
          },
        },
      });
      return eventResponse.data;
    } catch (error) {
      console.error('Error while creating the event:', error.message);
      throw error;
    }
  }
}
