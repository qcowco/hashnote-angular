import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MatDialogRef} from '@angular/material';
import {MAT_DIALOG_DATA} from '@angular/material/';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-options-dialog',
  templateUrl: './options-dialog.component.html',
  styleUrls: ['./options-dialog.component.css']
})
export class OptionsDialogComponent implements OnInit {
  methodSelection: Method;
  methods: Method[];
  selfDestruct = false;
  destructionSelection: Time;
  destructionTimes: Time[];
  nameForm: FormGroup;
  visitForm: FormGroup;

  constructor(public dialog: MatDialogRef<OptionsDialogComponent>, @Optional() @Inject(MAT_DIALOG_DATA) public defaultValues,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.nameForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(32)]]
    });

    this.visitForm = this.formBuilder.group({
      visits: ['', [Validators.pattern('([1-9]+[0-9]*)')]]
    });

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

    this.applyDefaultValuesWhenPossible();
  }

  private applyDefaultValuesWhenPossible() {
    this.setDefaultName();

    this.setDefaultMethod();

    this.setDefaultDestructionTime();

    this.setDefaultMaxVisits();
  }

  private setDefaultName() {
    if (this.defaultValues.name) {
      this.nameForm.controls.name.setValue(this.defaultValues.name);
    }
  }

  private setDefaultMethod() {
    if (this.defaultValues.method) {
      this.methodSelection = this.methods.find(method => method.name === this.defaultValues.method);
    }
  }

  private setDefaultDestructionTime() {
    if (this.defaultValues.destruction != null && this.defaultValues.destruction >= 0) {
      this.destructionSelection = this.destructionTimes.find(time => time.value === this.defaultValues.destruction);
    }
  }

  private setDefaultMaxVisits() {
    if (this.defaultValues.visits > 0) {
      this.visitForm.controls.visits.setValue(this.defaultValues.visits);
    }
  }

  public confirmSelection() {
    this.dialog.close({
      name: this.nameForm.controls.name.value,
      method: this.methodSelection.name,
      destruction: this.getDestructionTime(),
      visits: this.getMaxVisits()
    });
  }

  getDestructionTime() {
    if (this.selfDestruct) {
      return this.destructionSelection.value;
    } else {
      return null;
    }
  }

  getMaxVisits() {
    if (this.selfDestruct) {
      return this.visitForm.controls.visits.value;
    } else {
      return 0;
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
