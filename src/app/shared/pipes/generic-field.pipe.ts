import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'genericField'
})
export class GenericFieldPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    return value.replace("_",' ')
                .split(" ")
                .map(function(a){ 
                  return a.charAt(0).toUpperCase() + a.slice(1); 
                 })
                .join(" ");
  }

}
