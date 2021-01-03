import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { UserCredential } from '../../models/user-credential';

@Component({
  selector: 'hw-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnChanges {
  @Input() loggingIn = false;
  @Output() submitForm: EventEmitter<UserCredential> = new EventEmitter<UserCredential>();
  form: FormGroup;

  constructor() {
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.loggingIn) {
      this.loggingIn ? this.form.disable() : this.form.enable();
    }
  }

  submit(): void {
    if (!this.form.valid || this.loggingIn) {
      return;
    }

    const email: string = this.form.get('email').value;
    const password: string = this.form.get('password').value;

    this.submitForm.emit({ email, password });
  }

  private initForm(): void {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)])
    });
  }
}
