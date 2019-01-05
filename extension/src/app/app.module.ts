import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BackgroundPageComponent } from './background-page/background-page.component';
import { OptionsPageComponent } from './options-page/options-page.component';
import { PopupPageComponent } from './popup-page/popup-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from "@angular/forms";

//-----------------material---------------------------------------------
import { MatCheckboxModule } from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material";

@NgModule({
  declarations: [
    AppComponent,
    BackgroundPageComponent,
    OptionsPageComponent,
    PopupPageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
      ReactiveFormsModule,
      MatCheckboxModule,
      MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
