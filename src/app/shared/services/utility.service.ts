import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilityService {
  constructor() {}

  // Used to get value from an event(It will give an error if you did
  // this in the html without using -as-) to put it in the input filter for p-table etc.
  inputFilter = (event: Event) => (event.target as HTMLTextAreaElement)?.value;

  isNullOrUndefined = (item: any) =>
    item == null || item == undefined ? true : false;
}
