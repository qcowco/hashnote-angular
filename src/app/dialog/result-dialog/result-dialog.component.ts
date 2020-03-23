import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material';
import {EncryptionCredentials} from '../../model/encryption-credentials/encryption-credentials';

@Component({
  selector: 'app-result-dialog',
  templateUrl: './result-dialog.component.html',
  styleUrls: ['./result-dialog.component.css']
})
export class ResultDialogComponent implements OnInit {
  private id: string;
  private key: string;
  private url: string;

  constructor(@Optional() @Inject(MAT_DIALOG_DATA) public encryptionCredentials: EncryptionCredentials) {
  }

  ngOnInit() {
    this.applyCredentials();
    this.setUrl();
  }

  private applyCredentials() {
    this.id = this.encryptionCredentials.getId();
    this.key = this.encryptionCredentials.getKey();
  }

  onClickKey() {
    this.clipboardCopy(this.key);
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
    this.url = 'http://localhost:4200/' + this.id + '/' + this.key;
  }
}
