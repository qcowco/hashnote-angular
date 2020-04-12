import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {NoteResponse} from '../../model/note-response/note-response';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {
  url: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public noteResponse: NoteResponse) {
  }

  ngOnInit() {
    this.setUrl();
  }


  onClickKey() {
    this.clipboardCopy(this.noteResponse.secretKey);
  }

  onClickUrl() {
    this.clipboardCopy(this.url);
  }

  clipboardCopy(text: string) {
    const cpyBox = document.createElement('textarea');
    cpyBox.style.position = 'fixed';
    cpyBox.style.left = '0';
    cpyBox.style.top = '0';
    cpyBox.style.opacity = '0';
    cpyBox.value = text;
    document.body.appendChild(cpyBox);
    cpyBox.focus();
    cpyBox.select();
    document.execCommand('copy');
    document.body.removeChild(cpyBox);
  }

  private setUrl() {
    this.url = window.location.origin + '/' + this.noteResponse.noteId + '/' + this.noteResponse.secretKey;
  }
}
