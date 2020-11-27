import { Router } from '@angular/router';
import { FirebaseService } from '@shared/services/firebase.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  firstCategory: any;
  disabled = true;
  constructor(private db: AngularFireDatabase, private _service: FirebaseService, private _store: Store, private router: Router) {

  }

  ngOnInit(): void {
    this.items = this._service.getNumberCategories(4);
    this.items.subscribe((item) => {
      this.firstCategory = item[0].key;
      this.disabled = false;
    })
  }

  addCategory() {

  }

  goTo(key: string) {
    console.log(key);
    this.router.navigate(['/category', key]);
  }

}
