import { Component } from '@angular/core';

@Component({
  selector: 'app-faqs',
  templateUrl: './faqs.component.html',
  styleUrls: ['./faqs.component.scss'],
})
export class FaqsComponent {
  faqValue: string = 'General';

  faqsOptions: any[] = [
    { icon: 'pi pi-info-circle', value: 'General' },
    { icon: 'pi pi-envelope', value: 'Mailing' },
    { icon: 'pi pi-question-circle', value: 'Support' },
    { icon: 'pi pi-credit-card', value: 'Billing' },
  ];
}
