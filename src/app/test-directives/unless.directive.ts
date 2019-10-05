import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[appUnless]'
})
export class UnlessDirective {

  private _goToElse = false;

  @Input() set appUnless(condition: boolean) {
    if (!condition) {
      this.vcRef.createEmbeddedView(this.templateRef);
      this._goToElse = false;
    } else {
      this.vcRef.clear();
      this._goToElse = true;
    }
  }

  @Input() set appUnlessElse(template: TemplateRef<any>) {
    if (this._goToElse) {
      this.vcRef.createEmbeddedView(template);
    }
  }

  constructor(private templateRef: TemplateRef<any>, private vcRef: ViewContainerRef) {
  }

}
