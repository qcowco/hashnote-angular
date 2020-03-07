import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.css']
})
export class OptionsDialogComponent implements OnInit {
  private name: string;
  private selection: string;
  private methods: string[];
  // todo methods from rest api

  constructor(public dialog: MatDialogRef<OptionsDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public defaultValues) {
    this.name = defaultValues.name;
    this.selection = defaultValues.method;
  }

  ngOnInit() {
    this.methods = [
      'AES'
    ];
  }

  public confirmSelection() {
    this.dialog.close({ name: this.name, method: this.selection });
  }

}
