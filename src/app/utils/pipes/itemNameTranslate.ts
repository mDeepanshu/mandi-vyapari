// app/utils/pipes/item-name-translate.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';
import { ITEM_NAME_HI } from '../constants/item-name.hi';

@Pipe({
  name: 'itemNameTranslate',
  standalone: true
})
export class ItemNameTranslatePipe implements PipeTransform {

  transform(itemName: string | null | undefined, isHindi: boolean): string {
    if (!itemName) return '';
    if (!isHindi) return itemName;
    return ITEM_NAME_HI[itemName.toUpperCase()] ?? itemName;
  }
}
