import { Injectable } from '@nestjs/common';

@Injectable()
export class CalendarService {
  private events = [];

  async getAllEvents() {
    return ('some events');
  }

  async createEvent(eventData: { title: string, description: string, date: number }) {
    const newEvent = { id: this.events.length + 1, ...eventData };
    this.events.push(newEvent);
    return newEvent;
  }
}
