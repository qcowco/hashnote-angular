import { Component, OnInit } from '@angular/core';
import {Note} from '../model/note/note';
import {NoteRequest} from '../model/note-request/note-request';
import {ActivatedRoute} from '@angular/router';
import {NoteService} from '../model/note-service/note.service';
import {MatDialog} from '@angular/material';
import {ResultDialogComponent} from '../result-dialog/result-dialog.component';
import {EncryptionCredentials} from '../model/encryption-credentials/encryption-credentials';
import {OptionsDialogComponent} from '../options-dialog/options-dialog.component';

@Component({
  selector: 'app-write-note',
  templateUrl: './write-note.component.html',
  styleUrls: ['./write-note.component.css']
})
export class WriteNoteComponent implements OnInit {
  private placeholderMessage = 'hashnote - type something';
  private textareaInput: string;
  private errorMessage: string;

  private method = 'AES';
  private noteName: string;

  private errorOccured = false;
  private isEncrypting = false;

  private createdNote: Note;
  private createdNoteRequest: NoteRequest;

  private receivedEncryptedNote: Note;
  private receivedEncryptionCredentials: EncryptionCredentials;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  public encryptTextarea() {
    this.isEncrypting = true;

    if (!this.isTextareaEmpty()) {
      if (this.method != null && this.noteName != null) {
        this.encryptNote();
      } else {
        this.encryptWithDialog();
      }
    }

    this.isEncrypting = false;
  }

  public isTextareaEmpty() {
    return this.textareaInput == null || this.textareaInput === '';
  }

  public encryptNote() {
    this.createNoteFromTextarea();
    this.createNoteRequest();

    this.noteService.save(this.createdNoteRequest).subscribe(data => {
        this.receivedEncryptionCredentials = new EncryptionCredentials(data);

        this.showEncryptionResult();

        this.getEncryptedNote();

        this.isEncrypting = false;
      },
      error => {
        this.handleError(error);
        this.isEncrypting = false;
      });
  }

  public createNoteFromTextarea() {
    this.createdNote = new Note(this.noteName, this.textareaInput);
  }

  public createNoteRequest() {
    this.createdNoteRequest = new NoteRequest(this.createdNote, this.method);
  }

  public getEncryptedNote() {
    return this.noteService.find(this.receivedEncryptionCredentials.getId()).subscribe(data => {
        this.receivedEncryptedNote = data;
      },
      error => {
      this.handleError(error);
      });
  }

  public handleError(error: any) {
    if (error.status === 404) {
      this.setErrorMessage('Error: Note doesnt exist.');
    } else if (error.status === 0) {
      this.setErrorMessage('Error: Unable to establish a connection with the API server.');
    } else if (error.status === 400) {
      this.setErrorMessage('Error: Missing name OR encryption method.');
    } else {
      this.setErrorMessage('Error: Unknown error.');
    }
  }

  public setErrorMessage(message: string) {
    this.errorMessage = message;
    this.errorOccured = true;
  }

  public errorAcknowledged() {
    this.errorOccured = false;
  }

  public isInputEmpty() {
    return this.textareaInput == null || this.textareaInput === '';
  }

  public finishedWriting() {
    return this.receivedEncryptedNote != null;
  }

  private showEncryptionResult() {
    this.dialog.open(ResultDialogComponent, { width: '950px', height: '140px', data: this.receivedEncryptionCredentials });
  }

  public tryGetEncryptedMessage() {
    if (this.errorOccured) {
      return this.errorMessage;
    } else if (this.finishedWriting()) {
      return this.receivedEncryptedNote.message;
    } else {
      return this.textareaInput;
    }
  }

  public openOptions() {
    const dialogRef = this.dialog.open(OptionsDialogComponent,
      { width: '350px', height: '225px', data: { name: this.noteName, method: this.method} });
    return dialogRef.afterClosed().toPromise();
  }

  public encryptWithDialog() {
    this.openOptions().then( data => {
      if (data != null && data.name !== '') {
        this.noteName = data.name;
        this.method = data.method;

        this.encryptNote();
      }
    });
  }

  public setOptions() {
    this.openOptions().then(data => {
      if (data != null) {
        this.noteName = data.name;
        this.method = data.method;
      }
    });
  }
}
