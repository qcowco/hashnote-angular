import { Component, OnInit } from '@angular/core';
import {Note} from '../../model/note/note';
import {ActivatedRoute} from '@angular/router';
import {NoteService} from '../../service/note-service/note.service';
import {MatDialog} from '@angular/material';
import {KeyDialogComponent} from '../../dialog/key-dialog/key-dialog.component';
import {SharedNoteService} from '../../service/shared-note/shared-note.service';

@Component({
  selector: 'app-view-note',
  templateUrl: './view-note.component.html',
  styleUrls: ['./view-note.component.css']
})
export class ViewNoteComponent implements OnInit {
  private placeholderMessage = '';

  private originalNote: Note;
  private decryptedNote: Note;

  private errorMessage: string;
  private errorOccured = false;

  private isDecrypting = false;

  private id: string;
  private key: string;


  constructor(private route: ActivatedRoute, private noteService: NoteService, private dialog: MatDialog,
              private sharedNote: SharedNoteService) { }

  ngOnInit() {
    this.id = this.getIdParam();

    if (this.keyParamExists()) {
      this.key = this.getKeyParam();
    }

    this.isDecrypting = true;

    this.noteService.find(this.id)
      .subscribe(
        data => {
          this.originalNote = data;

          this.sharedNote.emitChange(data);

          this.tryDecryptNote();

          this.isDecrypting = false;
        },
        error => {
          this.handleError(error);

          this.isDecrypting = false;
        }
      );
  }

  public getIdParam() {
    return this.route.snapshot.params.id;
  }

  public keyParamExists() {
    return this.getKeyParam() != null;
  }

  public getKeyParam() {
    return this.route.snapshot.params.key;
  }

  public tryDecryptNote() {
    if (this.key == null) {
      this.decryptWithDialog();
    } else {
      this.getDecryptedNote();
    }
  }

  public decryptWithDialog() {
    this.openKeyDialog().then(data => {
      if(data != null) {
        this.key = data;
        this.getDecryptedNote();
      }
    });
  }

  public openKeyDialog() {
    return this.dialog.open(KeyDialogComponent, { width: '700px', height: '220px' }).afterClosed().toPromise();
  }

  public getDecryptedNote() {
    this.isDecrypting = true;
    this.noteService.findDecrypted(this.id, this.key)
      .subscribe( data => {
        this.decryptedNote = data;
        this.sharedNote.emitChange(data);

        this.isDecrypting = false;
      },
        error => {
        if (error.status === 400) {
          this.key = null;
        }
        this.handleError(error);

        this.isDecrypting = false;
        });
  }

  private handleError(error: any) {
    if (error.status === 404) {
      this.setErrorMessage('Error: Note doesnt exist.');
    } else if (error.status === 0) {
      this.setErrorMessage('Error: Unable to establish a connection with the API server.');
    } else if (error.status === 400) {
      this.setErrorMessage('Error: Wrong key.');
    } else if (error.status === 404) {
      this.setErrorMessage('Error: Not found');
    } else {
      this.setErrorMessage('Error: Something went wrong');
    }
  }

  public setErrorMessage(message: string) {
    this.errorMessage = message;
    this.errorOccured = true;
  }

  public errorAcknowledged() {
    this.errorOccured = false;
  }

  public isNoteDecrypted() {
    return this.decryptedNote != null;
  }

  public hideContent() {
    this.decryptedNote = null;
  }

  public tryGetMessage() {
    if (this.errorOccured) {
      return this.errorMessage;
    }
    if (this.decryptedNote != null) {
      return this.decryptedNote.message;
    }
    if (this.originalNote != null) {
      return this.originalNote.message;
    }
  }
}

