import { Injectable } from '@angular/core';
import {Note} from '../../model/note/note';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedNoteService {
  private emitChangeSource = new Subject<Note>();
  public changeEmmited = this.emitChangeSource.asObservable();

  constructor() { }

  public emitChange(change: Note) {
    this.emitChangeSource.next(change);
  }
}
