import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-input-error',
  templateUrl: './custom-input-error.component.html',
  styleUrls: ['./custom-input-error.component.scss'],
})
export class CustomInputErrorComponent {
  @Input() msg: string = '';
}
