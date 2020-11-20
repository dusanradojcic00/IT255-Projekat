import { Product } from './../../models/product.model';
import { addItem } from './../../store/cart/cart.actions';
import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
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
  constructor(private db: AngularFireDatabase, private _service: FirebaseService, private _store: Store) {

  }

  ngOnInit(): void {
    this.items = this._service.getCategories();
  }

  addCategory() {
    // const categoryRef = this.db.list('categories');
    // categoryRef.push({ name: "Zestoko pice" });
    this._store.dispatch(addItem({ product: new Product() }))
  }

}
