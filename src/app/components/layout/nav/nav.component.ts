import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent {
  private breakpointObserver = inject(BreakpointObserver);

  isLarge$: Observable<boolean> = this.breakpointObserver
    .observe('(max-width: 1199.98px)')
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
}
