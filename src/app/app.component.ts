import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, ElementRef, Injector,
  Output, QueryList,
  ViewChild, ViewChildren, ViewEncapsulation,
} from '@angular/core';
import {PlaceholderComponent} from './placeholder.component';
import {PlaceholderBoxComponent} from './placeholder-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  @Output()
  inputFields = [{
    name: 'First Input',
    value: '',
    isChecked: false
  },
    {
      name: 'Second Input',
      value: '',
      isChecked: false
    }];

  // componentRef: ComponentRef<PlaceholderComponent>;
  placeholders: { [key: string]: ComponentRef<PlaceholderComponent> } = {};

  constructor(private resolver: ComponentFactoryResolver, private injector: Injector) {
  }

  @ViewChild('input', {static: false}) input: ElementRef;

  @ViewChild('placeholderContainer', {read: PlaceholderBoxComponent, static: false})
  container;

  includeAsPlaceholder(index: number) {
    this.inputFields[index].isChecked = !this.inputFields[index].isChecked;
    if (this.inputFields[index].isChecked) {
      const componentRef = this.resolver.resolveComponentFactory(PlaceholderComponent).create(this.injector);
      this.container.includePlaceholder(componentRef);
      componentRef.instance.text = this.inputFields[index].value;
      componentRef.instance.id = index;
      this.placeholders[index] = componentRef;
    } else if (this.placeholders[index]) {
      this.container.removePlaceholder(this.placeholders[index]);
      // this.placeholders[index].destroy();
      delete this.placeholders[index];
    }
  }

  onValueChanged(i: number) {
    if (this.placeholders[i]) {
      this.placeholders[i].instance.text = this.inputFields[i].value;
      // this.componentRef.instance.text = this.inputFields[i].value;
    }
  }

  onListenToMe($event: boolean, i: number) {
    if (this.placeholders[i]) {
      const newEvent = $event ?
        new MouseEvent('mouseenter', {bubbles: true}) :
        new MouseEvent('mouseleave');
      this.placeholders[i].instance.placeholder.nativeElement.dispatchEvent(newEvent);
    }
  }
}
