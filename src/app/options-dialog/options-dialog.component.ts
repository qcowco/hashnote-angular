import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from '@angular/material';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.css']
})
export class OptionsDialogComponent implements OnInit {
  private selection: string;
  private methods: string[];
  // todo methods from rest api

  constructor(public dialog: MatDialogRef<OptionsDialogComponent>) {
    this.methods = [
      'AES'
    ];
  }

  ngOnInit() {
  }

  public confirmSelection() {
    this.dialog.close(this.selection);
  }

}
