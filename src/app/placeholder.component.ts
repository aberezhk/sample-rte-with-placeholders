import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy, Renderer2,
} from '@angular/core';

@Component({
  selector: 'app-placeholder',
  template: `
    <span [ngStyle]="{'color': changed ? 'red': 'blue'}">{{this.text}}</span>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class PlaceholderComponent implements OnDestroy {

  _text = '';
  _parentText = '';
  changed = false;
  private changes: MutationObserver;

  ngOnDestroy(): void {
    this.changes.disconnect();
  }

  @Input() set text(value: string) {
    if (!this.changed) {
      this._text = value;
    } else if ( this.elementRef.nativeElement.innerText.trim() === value) {
      this.changed = false;
    }
    this._parentText = value;
    this.cdr.detectChanges();
  }

  get text() {
    return this._text;
  }

  constructor(public cdr: ChangeDetectorRef, private elementRef: ElementRef) {
    const element = this.elementRef.nativeElement;

    this.changes = new MutationObserver((mutations: MutationRecord[]) => {
        mutations.forEach((mutation: MutationRecord) => {
          this.updateDisplayedText(mutation);
        });
      }
    );

    this.changes.observe(element, {
      characterData: true,
       subtree: true
    });
  }

  updateDisplayedText(mutation: MutationRecord) {
    const newText = mutation.target.textContent;
    if (newText.toString().trim() === this._parentText.trim()) {
      this.changed = false;
    } else {
      this.changed = true;
    }
    this.cdr.detectChanges();
  }

}
