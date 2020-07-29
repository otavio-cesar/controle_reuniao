import { Directive, OnDestroy, ElementRef, Input } from '@angular/core';
import * as textMask from 'vanilla-text-mask/dist/vanillaTextMask.js';

@Directive({
  selector: '[appMaskDate]'
})
export class MaskDateDirective implements OnDestroy {

  mask = [/\d/, /\d/, '/', /\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]; // dd/mm/yyyy
  maskedInputController;

  constructor(private element: ElementRef) {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.mask
    });
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }

}

@Directive({
  selector: '[appMaskTime]'
})
export class MaskTimeDirective implements OnDestroy {

  mask = [/[0-9]/, /\d/, ':', /\d/, /\d/]
  maskedInputController;

  constructor(private element: ElementRef) {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.mask
    });
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }

}

@Directive({
  selector: '[appMaskMonth]'
})
export class MaskMonthDirective implements OnDestroy {

  mask = [/[0-9]/, /\d/, '/', /\d/, /\d/, /\d/, /\d/]
  maskedInputController;

  constructor(private element: ElementRef) {
    this.maskedInputController = textMask.maskInput({
      inputElement: this.element.nativeElement,
      mask: this.mask
    });
  }

  ngOnDestroy() {
    this.maskedInputController.destroy();
  }

}
