import { Module } from '@nestjs/common';
import { GoogleStrategy } from 'src/google.strategy';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CalendarController } from './calendar/calendar.controller';
import { CalendarService } from './calendar/calendar.service';

@Module({
  imports: [],
  controllers: [AppController, CalendarController],
  providers: [CalendarService, AppService, GoogleStrategy],
})
export class AppModule {}
