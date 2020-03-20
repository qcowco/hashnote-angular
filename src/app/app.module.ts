import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { WriteNoteComponent } from './write-note/write-note.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ViewNoteComponent } from './view-note/view-note.component';
import {MatButtonModule, MatDialogModule, MatInputModule, MatSelectModule, MatToolbarModule, MatTreeModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { OptionsDialogComponent } from './options-dialog/options-dialog.component';
import { ResultDialogComponent } from './result-dialog/result-dialog.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { KeyDialogComponent } from './key-dialog/key-dialog.component';
import { HeaderComponent } from './header/header.component';
import {JwtModule} from '@auth0/angular-jwt';
import { UserDialogComponent } from './user-dialog/user-dialog.component';
import {AuthInterceptorService} from './security/auth-interceptor/auth-interceptor.service';
import {FolderDialogComponent} from './folder-dialog/folder-dialog.component';

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
    MatTreeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        whitelistedDomains: ['localhost:8080']
      }
    }),
    ReactiveFormsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    OptionsDialogComponent,
    ResultDialogComponent,
    KeyDialogComponent,
    FolderDialogComponent
  ]
})
export class AppModule { }

export function tokenGetter() {
  return localStorage.getItem('access_token');
}
