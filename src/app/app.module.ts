import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WriteNoteComponent } from './component/write-note/write-note.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewNoteComponent } from './component/view-note/view-note.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OptionsDialogComponent } from './dialog/options-dialog/options-dialog.component';
import { ResultDialogComponent } from './dialog/result-dialog/result-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { KeyDialogComponent } from './dialog/key-dialog/key-dialog.component';
import { HeaderComponent } from './component/header/header.component';
import {JwtModule} from '@auth0/angular-jwt';
import { UserDialogComponent } from './dialog/user-dialog/user-dialog.component';
import {AuthInterceptorService} from './security/auth-interceptor/auth-interceptor.service';
import {FolderDialogComponent} from './dialog/folder-dialog/folder-dialog.component';
import {environment} from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    WriteNoteComponent,
    ViewNoteComponent,
    OptionsDialogComponent,
    ResultDialogComponent,
    KeyDialogComponent,
    HeaderComponent,
    UserDialogComponent,
    FolderDialogComponent
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
    MatToolbarModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: [environment.domain]
      }
    }),
    ReactiveFormsModule,
    MatCheckboxModule,
    MatTooltipModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    OptionsDialogComponent,
    ResultDialogComponent,
    KeyDialogComponent,
    FolderDialogComponent,
    UserDialogComponent
  ]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
