import { DateTime } from 'luxon';
import { FirebaseService } from './../../services/firebase.service';
import { Order } from './../../models/order.model';
import { AuthService } from './../../services/auth.service';
import { removeItem, removeAllItems } from './../../store/cart/cart.actions';
import { CartItem } from './../../models/cart-item.model';
import { Product } from './../../models/product.model';
import { getCartItems } from './../../store/cart/cart.reducer';
import { Component, HostBinding, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit, OnChanges {
  cartItems$;
  constructor(private _store: Store, private auth: AuthService, private database: FirebaseService) { }

  ngOnInit(): void {
    this.cartItems$ = this._store.pipe(select(getCartItems))
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.cartItems$ = this._store.pipe(select(getCartItems))
  }

  removeProduct(item: CartItem) {
    this._store.dispatch(removeItem({ cartItem: item }));
  }

  removeAll() {
    this._store.dispatch(removeAllItems());
  }

  payment() {
    let items: CartItem[];
    this._store.pipe(select(getCartItems)).subscribe(item => {
      items = item;
    });
    if (items.length < 1){
      alert('Your cart is empty!');
      return;
    }
    let total = 0;
    items.forEach(el => {
      total += el.product.price * el.quantity;
    });
    let order = new Order(items, total, this.auth.getUserId());
    this.database.addOrder(order).then(() => {
      this.removeAll();
    });

  }
}
