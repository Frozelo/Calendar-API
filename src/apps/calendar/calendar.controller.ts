import { Controller, Get, Post, Body } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { CreateEventDto } from './dto/create-event-dto';

@Controller('calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @ApiOperation({ summary: 'Get all events', description: 'Retrieve a list of all events.' })
  @Get()
  async getAllEvents() {
    const events = await this.calendarService.getAllEvents();
    return events;
  }
  @ApiOperation({ summary: 'Create an event', description: 'Create a new event.' })
  @ApiBody({ type: CreateEventDto })
  @Post()
  async createEvent(@Body() eventData: CreateEventDto) {
    const createdEvent = await this.calendarService.createEvent(eventData);
    return createdEvent;
  }
}
