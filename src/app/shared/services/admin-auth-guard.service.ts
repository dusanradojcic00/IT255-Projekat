import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService {
  constructor(private auth: AuthService, private router: Router) { }

  canActivate(): boolean {
    if (!this.auth.isUserLogged()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    if (!this.auth.isAdmin()) {
      this.router.navigateByUrl('/login');
      return false;
    }
    return true;
  }
}
