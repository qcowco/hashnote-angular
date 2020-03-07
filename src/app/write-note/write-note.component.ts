import { Component, OnInit } from '@angular/core';
import {Note} from '../model/note/note';
import {NoteRequest} from '../model/note-request/note-request';
import {ActivatedRoute} from '@angular/router';
import {NoteService} from '../model/note-service/note.service';
import {MatDialog} from '@angular/material';
import {ResultDialogComponent} from '../result-dialog/result-dialog.component';
import {EncryptionCredentials} from '../model/encryption-credentials/encryption-credentials';

@Component({
  selector: 'app-write-note',
  templateUrl: './write-note.component.html',
  styleUrls: ['./write-note.component.css']
})
export class WriteNoteComponent implements OnInit {
  private placeholderMessage = 'hashnote - type something';
  private textareaInput: string;
  private errorMessage: string;
  // private method: string; todo dialog
  // private noteName: string; todo dialog
  private method = 'AES';
  private noteName = 'Default name';

  private errorOccured = false;
  private processing = false;

  private createdNote: Note;
  private createdNoteRequest: NoteRequest;

  private receivedEncryptedNote: Note;
  private receivedEncryptionCredentials: EncryptionCredentials;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private dialog: MatDialog) { }

  ngOnInit() {
  }

  public encryptTextarea() {
    this.processing = true;

    if (!this.isTextareaEmpty()) {
      this.createNoteFromTextarea();
      this.createNoteRequest();

      this.noteSaveRequestPromise().then(data => {
        this.receivedEncryptionCredentials = new EncryptionCredentials(data);

        this.showEncryptionResult();

        this.getEncryptedNote();

        this.processing = false;
        },
        error => {
        this.handleError(error);
        this.processing = false;
        });
    }
  }

  public isTextareaEmpty() {
    return this.textareaInput == null || this.textareaInput === '';
  }

  public createNoteFromTextarea() {
    this.createdNote = new Note(this.noteName, this.textareaInput);
  }

  public createNoteRequest() {
    this.createdNoteRequest = new NoteRequest(this.createdNote, this.method);
  }

  public noteSaveRequestPromise() {
    return this.noteService.save(this.createdNoteRequest).toPromise();
  }

  public getEncryptedNote() {
    return this.noteService.find(this.receivedEncryptionCredentials.getId()).subscribe(data => {
        this.receivedEncryptedNote = data;
      },
      error => {
      this.handleError(error);
      });
  }

  private handleError(error: any) {
    if (error.status === 404) {
      this.setErrorMessage('Error: Note doesnt exist.');
    } else if (error.status === 0) {
      this.setErrorMessage('Error: Unable to establish a connection with the API server.');
    } else if (error.status === 400) {
      this.setErrorMessage('Error: Wrong key.');
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
    if ( this.receivedEncryptionCredentials == null ) {
      this.encryptTextarea();
    }
    if ( this.receivedEncryptedNote == null ) {
      this.getEncryptedNote();
    }
  }

  public isInputEmpty() {
    return this.textareaInput == null || this.textareaInput === '';
  }

  public finishedWriting() {
    return this.receivedEncryptedNote != null;
  }

  private showEncryptionResult() {
    this.dialog.open(ResultDialogComponent, { width: '900px', height: '130px', data: this.receivedEncryptionCredentials });
  }
}
