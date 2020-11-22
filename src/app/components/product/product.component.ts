import { CartItem } from './../../models/cart-item.model';
import { addItem } from './../../store/cart/cart.actions';
import { Option, Product } from './../../models/product.model';
import { FirebaseService } from './../../services/firebase.service';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { select, Store } from '@ngrx/store';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() product;
  constructor(private route: ActivatedRoute, private _service: FirebaseService, private _store: Store) { }

  ngOnInit(): void {

  }

  addToCart() {
    this._store.dispatch(addItem({ cartItem: new CartItem(this.product, 1) }));
  }

}
