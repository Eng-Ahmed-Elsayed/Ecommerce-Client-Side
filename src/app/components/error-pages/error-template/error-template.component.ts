import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-error-template',
  templateUrl: './error-template.component.html',
})
export class ErrorTemplateComponent {
  @Input() errorCode!: string;
  @Input() errorName!: string;
  @Input() errorMessage!: string;
  @Input() btnText: string = 'Go back to home';
  @Input() btnRouterLink: string = '/';

  private returnUrl!: string;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public navigateToUrl = () => {
    this.router.navigate([this.btnRouterLink], {
      queryParams: { returnUrl: this.returnUrl },
    });
  };
}
