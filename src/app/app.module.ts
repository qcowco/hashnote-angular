import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WriteNoteComponent } from './write-note/write-note.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewNoteComponent } from './view-note/view-note.component';
import {MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatToolbarModule} from '@angular/material';
import {FormsModule} from '@angular/forms';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import {HttpClientModule} from '@angular/common/http';
import { KeyDialogComponent } from './key-dialog/key-dialog.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    WriteNoteComponent,
    ViewNoteComponent,
    OptionsDialogComponent,
    ResultDialogComponent,
    KeyDialogComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatButtonModule,
    FormsModule,
    MatDialogModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    OptionsDialogComponent,
    ResultDialogComponent,
    KeyDialogComponent
  ]
})
export class AppModule { }
