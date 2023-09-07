import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsNotEmpty()
  @IsInt()
  month: number;

  @IsNotEmpty()
  @IsInt()
  day: number;

  @IsNotEmpty()
  @IsInt()
  hour: number;

  @IsInt()
  minute: number;

  @IsInt()
  second: number;

  @IsNotEmpty()
  @IsInt()
  utcCode: number;
}
