import { FirebaseService } from '@shared/services/firebase.service';
import { Order } from '@shared/models/order.model';
import { AuthService } from '@shared/services/auth.service';
import { removeItem, removeAllItems } from './../../store/cart/cart.actions';
import { CartItem } from '@shared/models/cart-item.model';
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
  sum: number;
  code: boolean;
  coupon: string;
  constructor(private _store: Store, private auth: AuthService, private database: FirebaseService) { }

  ngOnInit(): void {
    this.cartItems$ = this._store.pipe(select(getCartItems))
    this._store.pipe(select(getCartItems)).subscribe(items => {
      this.sum = items.reduce((acc, obj) => acc + obj.product.price * obj.quantity, 0)
    })

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
    if (items.length < 1) {
      alert('Your cart is empty!');
      return;
    }
    let total = 0;
    items.forEach(el => {
      total += el.product.price * el.quantity;
    });
    //If coupon is activated, find the discount in the database and use it.
    if (this.code) {
      this.database.getDiscount(this.coupon).subscribe(item => {
        total *= 1.0 - item
        let order = new Order(items, total, this.auth.getUserId());
        this.database.addOrder(order).then(() => {
          this.removeAll();
        });
      }
      )
    } else {
      let order = new Order(items, total, this.auth.getUserId());
      this.database.addOrder(order).then(() => {
        this.removeAll();
      });
    }


  }

  //Check if discount code is valid
  applyDiscountCode(coupon) {
    this.coupon = coupon;
    this.database.isCouponValid(coupon).subscribe(isValid => {
      this.code = isValid
    });
  }
}
