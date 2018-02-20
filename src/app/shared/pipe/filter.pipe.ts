import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any, filterString: string, propName: string): any {
    if(value.length === 0 || filterString === '') {
      return value;
    }

    const resultArray = value.filter(currentVal=> currentVal[propName].indexOf(filterString) > -1);
    return resultArray;
  }

}
