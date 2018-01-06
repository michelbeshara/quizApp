// Modules
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule }  from '@angular/platform-browser';
import { JsonpModule } from '@angular/http';
//  Components
import { AppComponent } from './app.component';
 // Services

@NgModule({
  imports: [
    BrowserModule,
    JsonpModule,
    ReactiveFormsModule
  ],
  declarations: [
    AppComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
