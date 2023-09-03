import { Component, Input } from '@angular/core';
// import {
//   ConfirmEventType,
//   ConfirmationService,
//   MessageService,
// } from 'primeng/api';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
  // providers: [ConfirmationService, MessageService],
})
export class ConfirmDialogComponent {
  @Input() header?: string = 'Confirmation';
}
