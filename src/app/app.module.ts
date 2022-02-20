import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app.component';
import {GoogleChartsModule} from "angular-google-charts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    GoogleChartsModule,
    PlotlyModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
