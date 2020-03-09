import { Component, OnInit } from '@angular/core';
import {SharedNoteService} from '../service/shared-note/shared-note.service';
import {Note} from '../model/note/note';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private emittedNote: Note;

  constructor(private sharedNote: SharedNoteService) {
    sharedNote.changeEmmited.subscribe(note => this.emittedNote = note);
  }

  ngOnInit() {
  }

  getName() {
    if (this.emittedNote != null) {
      return this.emittedNote.name;
    }
  }

}
