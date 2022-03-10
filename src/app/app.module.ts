import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import * as PlotlyJS from 'plotly.js-dist-min';
import { PlotlyModule } from 'angular-plotly.js';
import { NgxEchartsModule } from 'ngx-echarts';
import { AppComponent } from './app.component';
import {GoogleChartsModule} from "angular-google-charts";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSidenavModule} from "@angular/material/sidenav";
import { SideNavigationComponent } from './side-navigation/side-navigation.component';
import { GraphsComponent } from './graphs/graphs.component';
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatListModule} from "@angular/material/list";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatCardModule} from "@angular/material/card";

PlotlyModule.plotlyjs = PlotlyJS;

@NgModule({
  declarations: [
    AppComponent,
    SideNavigationComponent,
    GraphsComponent
  ],
  imports: [
    BrowserModule,
    GoogleChartsModule,
    PlotlyModule,
    BrowserAnimationsModule,
    MatTabsModule,
    NgxEchartsModule.forRoot({
      echarts: () => import('echarts')
    }),
    MatSidenavModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatToolbarModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
