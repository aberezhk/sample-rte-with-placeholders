import {ApplicationRef, Component, ComponentRef, ElementRef, EmbeddedViewRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-placeholder-box',
  templateUrl: './placeholder-box.component.html'
})
export class PlaceholderBoxComponent implements OnInit {

  @ViewChild('placeholderContainer', {read: ElementRef, static: true})
  container;
  currentRange: Range;

  constructor(private appRef: ApplicationRef) {
  }

  ngOnInit() {
  }

  includePlaceholder(componentRef: ComponentRef<any>) {
    this.appRef.attachView(componentRef.hostView);
    const domElem = (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
    if (this.currentRange) {
      this.currentRange.insertNode(domElem);
      domElem.insertAdjacentHTML('beforebegin', '<span>&nbsp;</span>');
    } else {
      const newLi = document.createElement('li');
      this.container.nativeElement.insertAdjacentElement('beforeend', newLi);
      newLi.insertAdjacentElement('beforeend', domElem);
    }
    domElem.insertAdjacentHTML('afterend', '<span>&nbsp;</span>');
  }

  removePlaceholder(componentRef: ComponentRef<any>) {
    const parent = componentRef.location.nativeElement.parentElement;
    const prevSpan = componentRef.location.nativeElement.previousElementSibling;
    const nextSpan = componentRef.location.nativeElement.nextElementSibling;
    if (nextSpan) {
      const nextSpanText = nextSpan.innerHTML.replace('&nbsp;', '');
      nextSpan.innerHTML = nextSpanText;
    }
    if (prevSpan) {
      const prevSpanText = prevSpan.innerHTML.replace('&nbsp;', '');
      prevSpan.innerHTML = prevSpanText;
    }
    if (parent.innerText === componentRef.location.nativeElement.innerText) {
      parent.remove();
    }
    componentRef.destroy();
    this.appRef.detachView(componentRef.hostView);
  }

  setCaret() {
    this.currentRange = document.getSelection().getRangeAt(0);
  }
}

