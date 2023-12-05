import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'app-generic-input-errors',
  templateUrl: './generic-input-errors.component.html',
})
export class GenericInputErrorsComponent {
  @Input() inputName!: string;
  @Input() genericFormControl!:
    | AbstractControl<any, any>
    | FormControl<any>
    | null;
}
