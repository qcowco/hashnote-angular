import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-key-dialog',
  templateUrl: './key-dialog.component.html',
  styleUrls: ['./key-dialog.component.css']
})
export class KeyDialogComponent implements OnInit {
  key: string;

  constructor(private dialogRef: MatDialogRef<KeyDialogComponent>) { }

  ngOnInit() {
  }

  confirm() {
    this.dialogRef.close(this.key);
  }

  close() {
    this.dialogRef.close();
  }
}
