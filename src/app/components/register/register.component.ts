import { AuthService } from '@shared/services/auth.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;
  constructor(private fb: FormBuilder, private _router: Router, private _auth: AuthService) {
    this.registerForm = this.fb.group({
      'username': ['', Validators.required],
      'password': ['', Validators.required]
    })
  }

  onSubmit() {
    if (this.registerForm.invalid) {
      return
    }
    const username = this.registerForm.get('username').value;
    const password = this.registerForm.get('password').value;
    this._auth.signup(username, password);
  }

  ngOnInit(): void {
    if (this._auth.isUserLogged()) {
      this._router.navigate(['']);
    }
  }
}
