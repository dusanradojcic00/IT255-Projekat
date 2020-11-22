import { getUserStatus } from './../store/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { removeItem } from './../store/cart/cart.actions';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Observable<any>;

  constructor(private firebaseAuth: AngularFireAuth, private _router: Router, private store: Store) {
    this.user = firebaseAuth.authState;
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  isUserLogged(): boolean {
    let loggedIn: boolean;
    this.store.pipe(select(getUserStatus)).subscribe(item => {
      loggedIn = item;
    })
    if (this.getUserId() && loggedIn) {
      return true;
    } else {
      return false
    }
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Success!', value);
        this._router.navigate(['/login']);
        return true;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        return false;
      });
  }

  login(email: string, password: string) {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        console.log('Nice, it worked!', value);
        localStorage.setItem('userId', value.user.uid);
        this._router.navigate(['']);
        return true;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        return false;
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    localStorage.removeItem('userId');
  }
}
