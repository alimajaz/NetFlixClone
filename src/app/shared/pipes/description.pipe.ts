import { Pipe, type PipeTransform } from '@angular/core';

@Pipe({
  name: 'Description',
  standalone: true,
})
export class DescriptionPipe implements PipeTransform {

  transform(value: string, args?: number): any {
    return `${value.substring(0,args)}...`;
  }

}
