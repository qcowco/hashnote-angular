import { Component, OnInit } from '@angular/core';
import {Note} from '../../model/note/note';
import {NoteRequest} from '../../model/note-request/note-request';
import {ActivatedRoute} from '@angular/router';
import {NoteService} from '../../service/note-service/note.service';
import {MatDialog} from '@angular/material';
import {ResultDialogComponent} from '../../dialog/result-dialog/result-dialog.component';
import {OptionsDialogComponent} from '../../dialog/options-dialog/options-dialog.component';
import {SharedNoteService} from '../../service/shared-note/shared-note.service';
import {NoteResponse} from '../../model/note-response/note-response';

@Component({
  selector: 'app-write-note',
  templateUrl: './write-note.component.html',
  styleUrls: ['./write-note.component.css']
})
export class WriteNoteComponent implements OnInit {
  placeholderMessage = '';
  textareaInput: string;
  errorMessage: string;

  method = 'AES';
  noteName: string;
  destructionTime: number;
  visits: number;

  errorOccured = false;
  isEncrypting = false;

  createdNote: Note;
  createdNoteRequest: NoteRequest;

  receivedEncryptedNote: Note;
  receivedNoteResponse: NoteResponse;

  constructor(private route: ActivatedRoute, private noteService: NoteService, private dialog: MatDialog,
              private sharedNote: SharedNoteService) { }

  ngOnInit() {
  }

  public encryptTextarea() {
    if (!this.isTextareaEmpty()) {
      if (this.method != null && this.noteName != null) {
        this.encryptNote();
      } else {
        this.encryptWithDialog();
      }
    }
  }

  public isTextareaEmpty() {
    return this.textareaInput == null || this.textareaInput === '';
  }

  public encryptNote() {
    this.isEncrypting = true;

    this.createNote();
    this.createNoteRequest();

    this.noteService.save(this.createdNoteRequest).subscribe(data => {
        this.receivedNoteResponse = data;

        this.showEncryptionResult();

        this.getEncryptedNote();

        this.isEncrypting = false;
      },
      error => {
        this.handleError(error);
        this.isEncrypting = false;
      });
  }

  public createNote() {
    this.createdNote = new Note(this.noteName, this.textareaInput);

    if (this.visits !== 0) {
      this.createdNote.maxVisits = this.visits;
    }
  }

  public createNoteRequest() {
    this.createdNoteRequest = new NoteRequest(this.createdNote, this.method, this.destructionTime);
  }

  public getEncryptedNote() {
    return this.noteService.find(this.receivedNoteResponse.noteId).subscribe(data => {
        this.receivedEncryptedNote = data;
        this.sharedNote.emitChange(data);
        // todo oddzielic emit
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
    this.dialog.open(ResultDialogComponent, { width: '950px', height: '140px', data: this.receivedNoteResponse });
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
      {
        width: '350px',
        height: '350px',
        data: { name: this.noteName, method: this.method, destruction: this.destructionTime, visits: this.visits}
      });
    return dialogRef.afterClosed().toPromise();
  }

  public encryptWithDialog() {
    this.openOptions().then( data => {
      if (data != null && data.name !== '') {
        this.noteName = data.name;
        this.method = data.method;
        this.destructionTime = data.destruction;
        this.visits = data.visits;
  // todo: wydzielic wspolna metode

        this.encryptNote();
      }
    });
  }

  public setOptions() {
    this.openOptions().then(data => {
      if (data != null) {
        this.noteName = data.name;
        this.method = data.method;
        this.destructionTime = data.destruction;
        this.visits = data.visits;
      }
    });
  }
}
