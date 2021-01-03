import { Pipe, PipeTransform } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Pipe({
  name: 'validationMessage'
})
export class ValidationMessagePipe implements PipeTransform {
  transform(errors: ValidationErrors): string {
    if (!errors) {
      return null;
    }

    const errorKeys = Object.keys(errors);

    if (errorKeys.length === 0) {
      return null;
    }

    switch (errorKeys[0]) {
      case 'required':
        return 'Pole jest wymagane';
      case 'email':
        return 'Niepoprawny adres email';
      case 'minlength':
        return `Minimalna liczba znaków w polu to ${errors.minlength.requiredLength}`;
      default:
        return null;
    }
  }
}
