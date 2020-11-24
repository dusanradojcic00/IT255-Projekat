import { AuthService } from './../../services/auth.service';
import { FirebaseService } from './../../services/firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  loading: boolean;
  orders$: Observable<any>;
  constructor(private database: FirebaseService, private auth: AuthService) { 
    this.loading = true;
  }

  ngOnInit(): void {
    this.orders$ = this.database.getOrdersByUser(this.auth.getUserId());
  }

}
