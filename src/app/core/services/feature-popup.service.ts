import { Injectable, ViewContainerRef } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FeaturePopupComponent } from 'src/app/maps/feature-popup/feature-popup.component';
@Injectable({
  providedIn: 'root',
})
export class FeaturePopupService {
  private ref: OverlayRef | undefined;
  constructor(private overlay: Overlay) {}

  open(trigger: any, viewContainerRef: ViewContainerRef) {
    const position = this.overlay
      .position()
      .flexibleConnectedTo(trigger)
      .withPositions([
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'end',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'bottom',
          overlayX: 'start',
          overlayY: 'top',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'bottom',
        },
        {
          originX: 'start',
          originY: 'top',
          overlayX: 'start',
          overlayY: 'bottom',
        },
      ]);
    this.ref = this.overlay.create({ positionStrategy: position });
    const component = new ComponentPortal(
      FeaturePopupComponent,
      viewContainerRef,
      null
    );
    this.ref.attach(component);
    return this.ref;
  }
}
