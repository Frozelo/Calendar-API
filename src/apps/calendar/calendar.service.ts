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

  private readonly calendar: calendar_v3.Calendar;
  constructor() {
    this.calendar = google.calendar({
      version: 'v3',
      auth: this.googleService,
    });
  }
  createUrl() {
    return new Promise(async (resolve, reject) => {
      try {
        const authUrl = await this.googleService.generateAuthUrl({
          access_type: 'offline',
          scope: [
            'https://www.googleapis.com/auth/calendar',
            'https://www.googleapis.com/auth/userinfo.profile',
          ],
        });
        resolve(authUrl);
      } catch (error) {
        console.error('Error while generating auth URL:', error.message);
        reject(error);
      }
    });
  }

  getTokenAndLoggin(code: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const data = await this.googleService.getToken(code);
        this.googleService.setCredentials(data.tokens);
        console.log(data);

        const oauth2Client = google.oauth2({
          version: 'v2',
          auth: this.googleService,
        });

        const userInfoResponse = await oauth2Client.userinfo.get();
        console.log('User Info:', userInfoResponse.data);
        resolve(userInfoResponse.data);
      } catch (error) {
        console.error('Error while getting user info:', error.message);
        reject(error);
      }
    });
  }

  getCalendarNames() {
    return new Promise(async (resolve, reject) => {
      try {
        const calendarListResponse = await this.calendar.calendarList.list();
        // const calendarNames = calendarListResponse.data.items.map(
        //   (item) => item.summary,
        // );
        resolve(calendarListResponse);
      } catch (error) {
        console.error('Error while getting calendar names:', error.message);
        reject(error);
      }
    });
  }

  createEventPost(eventData: CreateEventDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const moment = require('moment-timezone');
        const startDateTime = moment.tz(
          {
            year: eventData.startYear,
            month: eventData.startMonth - 1,
            day: eventData.startDay,
            hour: eventData.startHour,
            minute: eventData.startMinute,
          },
          'Europe/Moscow',
        );
        const endDateTime = moment.tz(
          {
            year: eventData.endYear,
            month: eventData.endMonth - 1,
            day: eventData.endDay,
            hour: eventData.endHour,
            minute: eventData.endMinute,
          },
          'Europe/Moscow',
        );

        const eventResponse = await this.calendar.events.insert({
          calendarId:
            '3cc4ceea284a3a874d89d641ad3251da939f4b54c250ffdfc35c2930a23d6e3c@group.calendar.google.com',
          auth: this.googleService,
          requestBody: {
            summary: eventData.summary,
            description: eventData.description,
            eventType: eventData.eventType,
            location: eventData.location,
            colorId: eventData.colorId,
            start: {
              dateTime: startDateTime.toISOString(),
              timeZone: 'Europe/Moscow',
            },
            end: {
              dateTime: endDateTime.toISOString(),
              timeZone: 'Europe/Moscow',
            },
          },
        });
        console.log(startDateTime);
        resolve(eventResponse.data);
      } catch (error) {
        console.error('Error while creating the event:', error.message);
        reject(error);
      }
    });
  }
}
