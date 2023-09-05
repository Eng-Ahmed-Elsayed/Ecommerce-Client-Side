import { Component, Input } from '@angular/core';
import { CustomOverlayService } from 'src/app/shared/services/custom-overlay.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent {
  @Input() btnName!: string;
  @Input() severity!: string;
  @Input() summary!: string;
  @Input() detail!: string;

  constructor(private customOverlayService: CustomOverlayService) {}
  showToast = () => {
    this.customOverlayService.showToast(
      this.severity,
      this.summary,
      this.detail
    );
  };
}
