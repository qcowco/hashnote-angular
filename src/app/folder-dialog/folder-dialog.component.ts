import {Component, Inject, OnInit, Optional} from '@angular/core';
import {FolderService} from '../service/folder-service/folder.service';
import {Folder} from '../model/folder/folder';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Note} from '../model/note/note';
import {SecurityService} from '../service/security-service/security.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-folder-dialog',
  templateUrl: './folder-dialog.component.html',
  styleUrls: ['./folder-dialog.component.css']
})
export class FolderDialogComponent implements OnInit {
  private folderName = '';
  private updateFolderName = '';
  private updating = false;
  private updatedFolderId: string;

  folders: Folder[];

  constructor(private dialogRef: MatDialogRef<FolderDialogComponent>, private folderService: FolderService,
              private securityService: SecurityService, @Optional() @Inject(MAT_DIALOG_DATA) private note: Note, private router: Router ) {
    console.log(note);
  }

  ngOnInit() {
    this.folderService.findAll().subscribe(data => {
      console.log(data);
      this.folders = data;
    });
  }

  saveFolder() {
    const saveName = this.folderName;
    this.folderName = '';
    this.folderService.save(saveName).subscribe(data => {
      let folder = { id: data.folderId, name: saveName, author: this.securityService.getLoggedUser(), notes: []};
      this.folders.push(folder);
    });
  }

  deleteFolder(id: string) {
    this.folderService.delete(id).subscribe(data => {
      const folderIndex = this.folders.findIndex(obj => obj.id === id);
      this.folders.splice(folderIndex, 1);
    });
  }

  saveNoteToFolder(folderId: string) {
    this.folderService.saveNoteToFolder(folderId, this.note.id).subscribe( data => {
      const folder = this.folders.find(e => e.id === folderId);
      folder.notes.push({ id: this.note.id, name: this.note.name, createdAt: this.note.createdAt, expiresAt: this.note.expiresAt });
    });
  }

  removeNoteFromFolder(folderId: string, noteId: string) {
    this.folderService.removeNoteFromFolder(folderId, noteId).subscribe( data => {
      const folder = this.folders.find(e => e.id === folderId);
      folder.notes.splice(0, 1);
    });
  }

  isAddFolderValid() {
    return this.isFolderNameValid(this.folderName);
  }

  redirectToNote(id: string) {
    this.dialogRef.close();
    this.router.navigateByUrl(`${id}`);
  }

  updateFolder() {
    const updatedName = this.updateFolderName;
    this.updateFolderName = '';
    this.folderService.update(this.updatedFolderId, updatedName).subscribe(data => {
      this.folders.find(folder => folder.id === this.updatedFolderId).name = updatedName;
    });
    this.updating = false;
  }

  isUpdateFolderValid() {
    return this.isFolderNameValid(this.updateFolderName);
  }

  isFolderNameValid(name: string) {
    return name.length >= 3 && name.length < 32 && name;
  }

  findUpdatedFolderName() {
    return this.folders.find(f => f.id === this.updatedFolderId).name;
  }

  cancelUpdate() {
    this.updating = false;
  }

  getExpiration(note: Note) {
    let result = 'never';
    if (this.hasExpire(note)) {
      const seconds = this.getRemainingSeconds(note);
      if (seconds > 60) {
        result = Math.ceil(seconds / 60) + ' minutes';
      } else {
        result = Math.ceil(seconds) + ' seconds';
      }
    }
    return result;
  }

  getRemainingSeconds(note: Note) {
    const expireTime = new Date(note.expiresAt).getTime();
    return (expireTime - new Date().getTime()) / 1000;
  }

  getDateTime(note: Note) {
    return new Date(note.createdAt).toUTCString();
  }

  hasExpire(note: Note) {
    return (note.expiresAt != null);
  }

  timeSince(date: Date) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);

    let interval = Math.floor(seconds / 31536000);

    if (interval > 1) {
      return interval + ' years ago';
    }
    interval = Math.floor(seconds / 2592000);
    if (interval > 1) {
      return interval + ' months ago';
    }
    interval = Math.floor(seconds / 86400);
    if (interval > 1) {
      return interval + ' days ago';
    }
    interval = Math.floor(seconds / 3600);
    if (interval > 1) {
      return interval + ' hours ago';
    }
    interval = Math.floor(seconds / 60);
    if (interval > 1) {
      return interval + ' minutes ago';
    }
    return Math.floor(seconds) + ' seconds ago';

  }

}
