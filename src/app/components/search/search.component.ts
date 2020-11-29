import { getUser } from './../../store/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { Subject, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '@shared/services/auth.service';
import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements DoCheck, OnDestroy {
  loggedIn: boolean;
  public keyUp = new Subject<KeyboardEvent>();
  private subscription: Subscription;
  username: string;
  constructor(private auth: AuthService, private router: Router, private store: Store) { }

  ngDoCheck(): void {
    this.loggedIn = this.auth.isUserLogged();
  }

  ngOnInit(): void {
    this.subscription = this.keyUp.pipe(
      map((event: any) => event.target.value),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe((item) => {
      this.router.navigate(['/search', item.toLowerCase()]);
    })
    this.store.pipe(select(getUser)).subscribe(item => {
      if (item !== null)
      this.username = item.username.split('@')[0];
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }


  onSearch(search: HTMLInputElement) {
    this.router.navigate(['/search', search.value.toLowerCase()]);
  }

}
