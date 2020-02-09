import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'ucfirst'
})

export class ucfirstPipe implements PipeTransform {
  transform(value: string): string {
    const s = value.split('');
    if(s.length === 0) {
      return '';
    }
    s[0] = s[0].toUpperCase();
    return s.join('');

  }
}
