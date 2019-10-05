import {
  Directive,
  ElementRef,
  EventEmitter,
  HostBinding,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Directive({
  selector: '[appListenToMe]'
})
export class ListenToMeDirective implements OnInit {

  @Output() mouseEntered: EventEmitter<boolean> = new EventEmitter();
  @Input() color = 'lightyellow';
  @HostBinding('style.backgroundColor') backgroundColor = 'transparent';

  constructor() {
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.mouseEntered.emit(true);
    this.backgroundColor = this.color;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.mouseEntered.emit(false);
    this.backgroundColor = 'transparent';
  }

  ngOnInit(): void {
    this.backgroundColor = 'transparent';
  }
}
