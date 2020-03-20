import {Component, ElementRef, Inject, OnInit, Optional} from '@angular/core';
import {FolderService} from '../service/folder-service/folder.service';
import {Folder} from '../model/folder/folder';
import {MAT_DIALOG_DATA, MatDialogRef, MatTreeFlatDataSource, MatTreeFlattener} from '@angular/material';
import {FlatTreeControl} from '@angular/cdk/tree';
import {Note} from '../model/note/note';
import {SharedNoteService} from '../service/shared-note/shared-note.service';
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

  // private transformer = (node: FolderNode, level: number) => {
  //   return {
  //     expandable: !!node.children && node.children.length > 0,
  //     name: node.name,
  //     level: level
  //   };
  // }
  folders: Folder[];
  // treeControl = new FlatTreeControl<ExampleFlatNode> (
  //   node => node.level, node => node.expandable
  // );
  // treeFlattener = new MatTreeFlattener(
  //   this.transformer, node => node.level, node => node.expandable, node => node.children
  // );
  // folderNodes: FolderNode[];
  // private dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);



  constructor(private dialogRef: MatDialogRef<FolderDialogComponent>, private folderService: FolderService,
              private securityService: SecurityService, @Optional() @Inject(MAT_DIALOG_DATA) private note: Note, private router: Router ) {
  }

  ngOnInit() {
    this.folderService.findAll().subscribe(data => {
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
      folder.notes.push({ id: this.note.id, name: this.note.name });
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
}

interface ExampleFlatNode {
  expandable: boolean;
  name: string;
  level: number;
}

interface FolderNode {
  id: string;
  name: string;
  children?: NoteNode[];
}

interface NoteNode {
  id: string;
  name: string;
}
