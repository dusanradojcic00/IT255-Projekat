import { userLogin } from './../../store/user/user.action';
import { AuthService } from '@shared/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Store, select } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;;

  constructor(private fb: FormBuilder, private _auth: AuthService, private store: Store,
    private _router: Router) {
    this.loginForm = this.fb.group({
      'username': ['', Validators.required, Validators.email],
      'password': ['', Validators.required]
    })

  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return
    }
    const username = this.loginForm.get('username').value;
    const password = this.loginForm.get('password').value;
    this._auth.login(username, password);
  }

  ngOnInit(): void {
    if (this._auth.isUserLogged()) {
      this._router.navigate(['']);
    }
  }

}
