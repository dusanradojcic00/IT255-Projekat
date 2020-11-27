import { CartItem } from '@shared/models/cart-item.model';
import { addItem } from './../../store/cart/cart.actions';
import { Option, Product } from '@shared/models/product.model';
import { FirebaseService } from '@shared/services/firebase.service';
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
    let quantity: number;
    quantity = parseInt(prompt('Enter the quantity:', '1'));
    if (isNaN(quantity)) {
      alert('Invalid input')
      return;
    }
    this._store.dispatch(addItem({ cartItem: new CartItem(this.product, quantity) }));
  }

}
