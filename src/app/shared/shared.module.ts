import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from '../material.module';
import { ValidationMessagePipe } from './pipes/validation-message.pipe';

@NgModule({
  declarations: [ValidationMessagePipe],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [CommonModule, ReactiveFormsModule, MaterialModule, ValidationMessagePipe]
})
export class SharedModule {}
