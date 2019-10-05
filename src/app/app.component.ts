import {
  Component,
  ComponentFactoryResolver,
  ComponentRef, Injector,
  Output,
  ViewChild, ViewEncapsulation,
} from '@angular/core';
import {PlaceholderComponent} from './placeholder.component';
import {PlaceholderBoxComponent} from './placeholder-box.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
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
  placeholders: {[key: string]: ComponentRef<PlaceholderComponent>} = {};

  constructor(private resolver: ComponentFactoryResolver,  private injector: Injector) {
  }

  @ViewChild('placeholderContainer', {read: PlaceholderBoxComponent , static: true})
  container;

  includeAsPlaceholder(index: number) {
    this.inputFields[index].isChecked = !this.inputFields[index].isChecked;
    if (this.inputFields[index].isChecked) {
      const componentRef = this.resolver.resolveComponentFactory(PlaceholderComponent).create(this.injector);
      this.container.includePlaceholder(componentRef);
      componentRef.instance.text = this.inputFields[index].value;
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

}
