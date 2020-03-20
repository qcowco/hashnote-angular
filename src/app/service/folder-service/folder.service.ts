import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Folder} from '../../model/folder/folder';

@Injectable({
  providedIn: 'root'
})
export class FolderService {
  private readonly folderUrl: string;

  constructor(private http: HttpClient) {
    this.folderUrl = 'http://localhost:8080/api/v1/folders';
  }

  findAll(): Observable<Folder[]> {
    return this.http.get<Folder[]>(this.folderUrl);
  }

  save(name: string): Observable<{folderId: string}> {
    return this.http.post<{folderId: string}>(this.folderUrl, { name: name });
  }

  delete(id: string) {
    return this.http.delete(`${this.folderUrl}/${id}`);
  }

  saveNoteToFolder(folderId: string, noteId: string) {
    return this.http.post(`${this.folderUrl}/${folderId}`, { noteId: noteId });
  }

  removeNoteFromFolder(folderId: string, noteId: string) {
    return this.http.delete(`${this.folderUrl}/${folderId}/notes/${noteId}`);
  }

  update(folderId: string, name: string) {
    return this.http.patch(`${this.folderUrl}/${folderId}`, { name: name });
  }
}
