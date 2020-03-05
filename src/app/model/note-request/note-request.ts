import {Note} from '../note/note';

export class NoteRequest {
  private noteDto: Note;
  private method: string;

  constructor(noteDto: Note, method: string) {
    this.noteDto = noteDto;
    this.method = method;
  }
}
