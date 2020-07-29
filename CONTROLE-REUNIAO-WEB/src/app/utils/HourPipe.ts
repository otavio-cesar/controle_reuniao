import { Pipe, PipeTransform } from '@angular/core';
import { timeToString } from 'src/app/Utils/DateTimeFormat';

@Pipe({ name: 'hourPipe' })
export class HourPipe implements PipeTransform {
  transform(value: any): any {
    return timeToString(value);
  }
}
