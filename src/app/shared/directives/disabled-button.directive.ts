import {Directive, ElementRef, HostListener, Renderer2} from '@angular/core';


@Directive({selector: '[appDisabledButton]'})

export class DisabledButtonDirective {

  constructor(private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  @HostListener('click')
  onClick() {
    setTimeout( () => {
      this.renderer.setAttribute(this.elementRef.nativeElement, 'disabled', 'true');
    });
    setTimeout( () => {
      this.renderer.removeAttribute(this.elementRef.nativeElement, 'disabled');
    }, 1000);
  }

}
