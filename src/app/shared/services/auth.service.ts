import { userLogin, userLogout } from './../../store/user/user.action';
import { FirebaseService } from '@shared/services/firebase.service';
import { getUserStatus, UserData } from './../../store/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { removeItem } from './../../store/cart/cart.actions';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { User } from '@shared/models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  user: Observable<any>;

  constructor(private firebaseAuth: AngularFireAuth, private _router: Router, private store: Store, private database: FirebaseService) {
    this.user = firebaseAuth.authState;
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  isAdmin(): boolean {
    return localStorage.getItem('username') === 'dusanradojcic00@gmail.com' ? true : false;
  }

  isUserLogged(): boolean {
    return this.getUserId() ? true : false;
  }

  signup(email: string, password: string) {
    this.firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then(value => {
        this._router.navigate(['/login']);
        this.database.addUser(value.user.uid, email);
        return true;
      })
      .catch(err => {
        console.log('Something went wrong:', err.message);
        return false;
      });
  }

  login(email: string, password: string): any {
    this.firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(value => {
        localStorage.setItem('userId', value.user.uid);
        localStorage.setItem('username', value.user.email);
        let user= {
          uid: value.user.uid,
          username: value.user.email
        }
        this.store.dispatch(userLogin({ user: user }));
        this._router.navigate(['']);
        return true;
      })
      .catch(err => {
        alert(err.message);
      });
  }

  logout() {
    this.firebaseAuth.signOut();
    this.store.dispatch(userLogout());
    localStorage.removeItem('userId');
    localStorage.removeItem('username');
  }
}
