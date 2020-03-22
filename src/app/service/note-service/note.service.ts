import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Note} from '../../model/note/note';
import {Observable} from 'rxjs';
import {NoteRequest} from '../../model/note-request/note-request';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private readonly noteUrl: string;

  constructor(private http: HttpClient) {
    this.noteUrl = `${environment.api}/notes`;
  }

  public findAll(): Observable<Note[]> {
    return this.http.get<Note[]>(this.noteUrl);
  }

  public find(id: string): Observable<Note> {
    return this.http.get<Note>(`${this.noteUrl}/${id}`);
  }

  public findDecrypted(id: string, key: string): Observable<Note> {
    return this.http.get<Note>(`${this.noteUrl}/${id}/${key}`);
  }

  public save(noteRequest: NoteRequest): Observable<string> {
    return this.http.post(this.noteUrl, noteRequest, { responseType: 'text' });
  }
}
