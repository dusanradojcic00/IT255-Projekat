import { map } from 'rxjs/operators';
import { getUser } from './../../store/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { AuthService } from '@shared/services/auth.service';
import { FirebaseService } from '@shared/services/firebase.service';
import { Observable, Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  loading: boolean;
  orders$: Observable<any>;
  user;
  subscription: Subscription;
  constructor(private database: FirebaseService, private auth: AuthService, private store: Store) {
    this.loading = true;
  }

  ngOnInit(): void {
    this.subscription = this.store.pipe(select(getUser)).subscribe((item) => {
      this.database.getUser(item.uid).pipe(map(item => {
        this.user = item;
      })).subscribe()
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
