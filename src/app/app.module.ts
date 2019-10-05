import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppComponent } from './app.component';
import {PlaceholderComponent} from './placeholder.component';
import { ListenToMeDirective } from './test-directives/listen-to-me.directive';
import { PlaceholderBoxComponent } from './placeholder-box.component';
import { UnlessDirective } from './test-directives/unless.directive';

@NgModule({
  declarations: [
    AppComponent,
    PlaceholderComponent,
    ListenToMeDirective,
    PlaceholderBoxComponent,
    UnlessDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PlaceholderComponent,
  ],
})
export class AppModule { }
