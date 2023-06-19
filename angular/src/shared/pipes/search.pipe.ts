import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search',
})

export class SearchPipe implements PipeTransform {
    transform(items: any[], keyword: string, properties: string[]): any[] {
        if (!keyword) {
          return items;
        }
      
        keyword = keyword.toLowerCase();
      
        return items.filter(item => {
          for (const prop of properties) {
            const propValue = this.getPropertyValue(item, prop);
            if (propValue && propValue.toString().toLowerCase().includes(keyword)) {
              return true;
            }
          }
          return false;
        });
      }
      
      private getPropertyValue(obj: any, prop: string): any {
        const propParts = prop.split('.');
        let value = obj;
        for (const part of propParts) {
          if (value.hasOwnProperty(part)) {
            value = value[part];
          } else if (value.hasOwnProperty(part + 'Id')) {
            value = value[part + 'Id'];
          } else {
            return null;
          }
        }
        return value;
      }
    }