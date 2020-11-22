import { removeItem } from './../../store/cart/cart.actions';
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
  constructor(private _store: Store) { }

  ngOnInit(): void {
    this.cartItems$ = this._store.pipe(select(getCartItems))
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
    console.log(123);
    this.cartItems$ = this._store.pipe(select(getCartItems))
  }

  removeProduct(item: CartItem){
    this._store.dispatch(removeItem({cartItem: item}));
  }
}
