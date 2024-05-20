import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[stopEventPropagation]'
})
export class StopEventPropagationDirective {
  @HostListener('click', ['$event'])
  onClick(event: Event): void {
    console.log(event)
    event.stopPropagation()
  }
}
