import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'lastCharUppercase' })

export class LastCharUppercasePipe implements PipeTransform {
  transform(value: string) {
    const transformValue = value
      .split('')
      .map((i: string, index: number) => {
        if (index === value.length - 1) {
          return i.toUpperCase();
        }
        return i;
      })
      .join('');
    return transformValue;
  }
}
