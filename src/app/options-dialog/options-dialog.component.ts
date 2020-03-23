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
  private methodSelection: Method;
  private methods: Method[];
  private selfDestruct = false;
  private destructionSelection: Time;
  private destructionTimes: Time[];
  private visits: number;

  constructor(public dialog: MatDialogRef<OptionsDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public defaultValues) {
    this.name = defaultValues.name;
    this.methodSelection = defaultValues.method;
  }

  ngOnInit() {
    this.methods = [
      { name: 'AES', description: 'AES encryption with a 256-bit symmetric key'},
      { name: 'DESede', description: '3DES encryption with a 168-bit symmetric key'},
      { name: 'DES', description: 'DES encryption with a 56-bit symmetric key'}
    ];
    this.methodSelection = this.methods[0];
    this.destructionTimes = [
      { name: 'None', value: 0 },
      { name: '1 minute', value: 1 },
      { name: '2 minutes', value: 2 },
      { name: '5 minutes', value: 5 },
      { name: '10 minutes', value: 10 },
      { name: '30 minutes', value: 30 },
      { name: '1 hour', value: 60 },
      { name: '6 hours', value: 360 },
      { name: '24 hours', value: 1440 }
    ];
    this.destructionSelection = this.destructionTimes[0];
  }

  public confirmSelection() {
    this.dialog.close({ name: this.name, method: this.methodSelection.name, destruction: this.getDestructionTime(), visits: this.visits });
  }

  getDestructionTime() {
    if (this.selfDestruct) {
      return this.destructionSelection.value;
    } else {
      return null;
    }
  }

  checkboxChecked() {
    this.selfDestruct = !this.selfDestruct;
    if (this.selfDestruct) {
      this.dialog.updateSize('350px', '480px');
    } else {
      this.dialog.updateSize('350px', '350px');
    }
  }

}

interface Method {
  name: string;
  description: string;
}

interface Time {
  name: string;
  value: number;
}
