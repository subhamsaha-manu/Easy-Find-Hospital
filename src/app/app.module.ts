import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {FlexLayoutModule} from '@angular/flex-layout';

import {HttpClientModule} from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    MatCardModule,
    CommonModule,
    MatIconModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
