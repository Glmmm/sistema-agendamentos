import { FormControl, FormGroup, Validators } from '@angular/forms';

export const loginForm = () => {
  return new FormGroup({
    login: new FormControl('', [Validators.email, Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
};
