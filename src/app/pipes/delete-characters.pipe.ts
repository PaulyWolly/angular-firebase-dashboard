import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'deleteCharacters'
})
export class DeleteCharactersPipe implements PipeTransform {

  transform(value: any, ...args: unknown[]) {
    let finalValue = value;

    // remove 'a' from output
      if (finalValue.includes("a")) {
        finalValue = finalValue.replace(/a/g,'');
      }
    // remove spaces and join charactersS
      if (finalValue.includes(' ')) {
        finalValue = finalValue.split(' ').join('');
      }
   return finalValue;
 }

}
