import { FormControl, FormGroup, Validators } from '@angular/forms';

export const loginForm = () => {
  return new FormGroup({
    email: new FormControl('', [Validators.email, Validators.required]),
    pass: new FormControl('', [Validators.required]),
  });
};
