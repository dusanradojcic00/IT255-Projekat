import { Product } from './../../models/product.model';
import { addItem } from './../../store/cart/cart.actions';
import { FirebaseService } from './../../services/firebase.service';
import { Component, HostBinding, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  @HostBinding('attr.class') cssClass = 'container';
  constructor(private db: AngularFireDatabase, private _service: FirebaseService, private _store: Store) {

  }

  ngOnInit(): void {
    this.items = this._service.getCategories();
  }

  addCategory() {

  }

}
