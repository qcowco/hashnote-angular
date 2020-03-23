import { Component, OnInit } from '@angular/core';
import {SecurityService} from '../service/security-service/security.service';
import {ErrorStateMatcher} from '@angular/material/core';
import { MatDialogRef} from '@angular/material';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control.parent.dirty && control.parent.hasError('notSame'));
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.dirty && control.parent.hasError('notSame'));

    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-user-dialog',
  templateUrl: './user-dialog.component.html',
  styleUrls: ['./user-dialog.component.css']
})
export class UserDialogComponent implements OnInit {
  private login = true;
  loginForm: FormGroup;
  registerForm: FormGroup;
  matcher = new MyErrorStateMatcher();
  loginError = false;
  registerError = false;

  constructor(private userService: SecurityService, private dialogRef: MatDialogRef<UserDialogComponent>,
              private formBuilder: FormBuilder) {
  }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        usernameRegister: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        passwordRegister: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
        confirmPasswordRegister: ['', [Validators.required]]
      }, { validators: this.matchPasswords }
    );

    this.loginForm = this.formBuilder.group({
      usernameLogin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      passwordLogin: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
  }

  matchPasswords(group: FormGroup) {
    let pass = group.controls.passwordRegister.value;
    let confirmPass = group.controls.confirmPasswordRegister.value;

    return pass === confirmPass ? null : { notSame: true };
  }

  onSaveClick() {
    this.registerError = false;
    this.userService.registerUser(this.registerForm.controls.usernameRegister.value, this.registerForm.controls.passwordRegister.value)
      .subscribe(data => {
        this.onLoginClick();
        this.dialogRef.close();
      },
        error => {
          this.registerError = true;
        });
  }

  onLoginClick() {
    this.loginError = false;
    this.userService.login(this.loginForm.controls.usernameLogin.value, this.loginForm.controls.passwordLogin.value)
      .subscribe(data => {
        this.userService.saveToken(data.token);
        this.dialogRef.close();
      },
        error => {
          this.loginError = true;
        });
  }

  makeLoginForm() {
    this.login = true;
    this.dialogRef.updateSize( '350px', '295px');
  }

  makeRegisterForm() {
    this.login = false;
    this.dialogRef.updateSize('350px', '370px');
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
