import { PipeTransform, Pipe } from '@angular/core';

@Pipe({
  name: 'filterList',
  pure: true
})
export class FilterList implements PipeTransform {

  transform(list: any[], filterBy: string): any[] {

    filterBy = filterBy ? filterBy.toLowerCase() : null;

    const result = filterBy ? list.filter((item) =>
      item['nome'].toLowerCase().indexOf(filterBy) !== -1) : list;

    return result;

  }
}
