import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';

@Module({
  controllers: [CalendarController],
  providers: [CalendarService], // Убедитесь, что CalendarService добавлен здесь
})
export class CalendarModule {}
