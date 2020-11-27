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
  constructor(private auth: AuthService, private router: Router) { }

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
