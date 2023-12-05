import { FormGroup } from '@angular/forms';

export default function passwordMatchValidator(
  group: FormGroup
): { [key: string]: any } | null {
  const password = group.get('password');
  const confirmPassword = group.get('confirmPassword');
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true }; // invalid
  } else {
    return null; // valid
  }
}
