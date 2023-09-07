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

  createEventPost(eventData: CreateEventDto) {
    return new Promise(async (resolve, reject) => {
      try {
        const startDateTime =
          `${eventData.year}-${eventData.month
            .toString()
            .padStart(2, '0')}-${eventData.day.toString().padStart(2, '0')}T` +
          `${eventData.hour.toString().padStart(2, '0')}:${eventData.minute
            .toString()
            .padStart(2, '0')}:00` +
          `${eventData.utcCode >= 0 ? '+' : '-'}${Math.abs(eventData.utcCode)
            .toString()
            .padStart(2, '0')}:00`;
        const endDateTime =
          `${eventData.year}-${eventData.month.toString().padStart(2, '0')}-${(
            eventData.day + 1
          )
            .toString()
            .padStart(2, '0')}T` +
          `${(eventData.hour + 1)
            .toString()
            .padStart(2, '0')}:${eventData.minute
            .toString()
            .padStart(2, '0')}:00` +
          `${eventData.utcCode >= 0 ? '+' : '-'}${Math.abs(eventData.utcCode)
            .toString()
            .padStart(2, '0')}:00`;
        const calendar = google.calendar({
          version: 'v3',
          auth: this.googleService,
        });

        const eventResponse = await calendar.events.insert({
          calendarId: 'primary',
          auth: this.googleService,
          requestBody: {
            summary: eventData.summary,
            start: {
              dateTime: startDateTime,
            },
            end: {
              dateTime: endDateTime,
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
