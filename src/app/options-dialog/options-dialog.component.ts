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
  private selection: Method;
  private methods: Method[];

  constructor(public dialog: MatDialogRef<OptionsDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public defaultValues) {
    this.name = defaultValues.name;
    this.selection = defaultValues.method;
  }

  ngOnInit() {
    this.methods = [
      { name: 'AES', description: 'AES encryption with a 256-bit symmetric key'},
      { name: 'DESede', description: '3DES encryption with a 168-bit symmetric key'},
      { name: 'DES', description: 'DES encryption with a 56-bit symmetric key'}
    ];
    this.selection = this.methods[0];
  }

  public confirmSelection() {
    this.dialog.close({ name: this.name, method: this.selection.name });
  }

}

interface Method {
  name: string;
  description: string;
}
