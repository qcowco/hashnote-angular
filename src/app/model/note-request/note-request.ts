import {Note} from '../note/note';

export class NoteRequest {
  public noteDto: Note;
  public method: string;
  public minutesToExpiration?: number;

  constructor(noteDto: Note, method: string, minutesToExpiration: number) {
    this.noteDto = noteDto;
    this.method = method;
    this.minutesToExpiration = minutesToExpiration;
  }
}
