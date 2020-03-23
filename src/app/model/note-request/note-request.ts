import {Note} from '../note/note';

export class NoteRequest {
  public noteDto: Note;
  public method: string;
  public minutesToExpiration?: number;
  public maxVisits?: number;

  constructor(noteDto: Note, method: string, minutesToExpiration: number, maxVisits: number) {
    this.noteDto = noteDto;
    this.method = method;
    this.minutesToExpiration = minutesToExpiration;
    this.maxVisits = maxVisits;
  }
}
