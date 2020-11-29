import { getUser } from './../../store/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@shared/services/auth.service';
import { FirebaseService } from '@shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: Observable<any[]>;
  isAdmin = false;

  constructor( private _service: FirebaseService, private auth: AuthService) {
  }

  ngOnInit(): void {
    this.items = this._service.getCategories();
    this.isAdmin = this.auth.isAdmin();
   
  }

}
