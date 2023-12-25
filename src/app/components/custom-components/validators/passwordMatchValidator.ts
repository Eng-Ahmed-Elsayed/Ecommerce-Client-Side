import { AbstractControl, ValidationErrors } from '@angular/forms';

export default function passwordMatchValidator(
  group: AbstractControl
): ValidationErrors | null {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true }; // invalid
  } else {
    return null; // valid
  }
}
