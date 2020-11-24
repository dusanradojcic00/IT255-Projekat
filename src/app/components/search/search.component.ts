import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, DoCheck, OnInit } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements DoCheck {
  loggedIn: boolean;
  constructor(private auth: AuthService, private router: Router) { }

  ngDoCheck(): void {
    this.loggedIn = this.auth.isUserLogged();
  }

  logout(){
    this.auth.logout();
    this.router.navigate(['']);
  }

  onSearch(search: HTMLInputElement){
    this.router.navigate(['/search', search.value]);
  }
}
