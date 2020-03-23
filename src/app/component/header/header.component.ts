import { Component, OnInit } from '@angular/core';
import {SharedNoteService} from '../../service/shared-note/shared-note.service';
import {Note} from '../../model/note/note';
import {SecurityService} from '../../service/security-service/security.service';
import {MatDialog} from '@angular/material';
import {UserDialogComponent} from '../../dialog/user-dialog/user-dialog.component';
import {FolderDialogComponent} from '../../dialog/folder-dialog/folder-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private emittedNote: Note;
  private username: string;

  constructor(private sharedNote: SharedNoteService, private securityService: SecurityService, private dialog: MatDialog) {
    sharedNote.changeEmmited.subscribe(note => this.emittedNote = note);
  }

  ngOnInit() {
    if (this.securityService.isLogged()) {
      this.username = this.securityService.getLoggedUser();
    }
  }


  getName() {
    if (this.emittedNote != null) {
      return this.emittedNote.name;
    }
  }

  openUserDialog() {
    return this.dialog.open(UserDialogComponent, { width: '350px', height: '295px', panelClass: 'user-dialog' }).afterClosed().toPromise();
  }

  openFolderDialog() {
    return this.dialog.open(FolderDialogComponent, { width: '925px', height: '600px', data:  this.emittedNote})
      .afterClosed().toPromise();
  }

}
