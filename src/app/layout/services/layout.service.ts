import { BreakpointObserver } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LayoutService {
  isSidebarCollapsed$ = new BehaviorSubject(true);
  isDesktop$ = this.breakpointObserver
    .observe(`(min-width: 1280px)`)
    .pipe(map((state) => state.matches));

  isMobile$ = this.breakpointObserver
    .observe(`(max-width: 599px)`)
    .pipe(map((state) => state.matches));
  constructor(private breakpointObserver: BreakpointObserver) {}

  toggleSidebarCollapsed(): void {
    this.isSidebarCollapsed$.next(!this.isSidebarCollapsed$.value);
  }
}
