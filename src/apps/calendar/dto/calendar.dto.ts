import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsInt()
  startYear: number;

  @IsNotEmpty()
  @IsInt()
  startMonth: number;

  @IsNotEmpty()
  @IsInt()
  startDay: number;

  @IsNotEmpty()
  @IsInt()
  startHour: number;

  @IsInt()
  startMinute: number;

  @IsInt()
  startSecond: number;

  @IsNotEmpty()
  @IsInt()
  endYear: number;

  @IsNotEmpty()
  @IsInt()
  endMonth: number;

  @IsNotEmpty()
  @IsInt()
  endDay: number;

  @IsNotEmpty()
  @IsInt()
  endHour: number;

  @IsInt()
  endMinute: number;

  @IsInt()
  endSecond: number;
}
