import { Order, StatusCode } from '@shared/models/order.model';
import { Router } from '@angular/router';
import { addItem } from './../../store/cart/cart.actions';
import { Store } from '@ngrx/store';
import { CartItem } from '@shared/models/cart-item.model';
import { map } from 'rxjs/operators';
import { DateHelper } from '@shared/helpers/helper';
import { AuthService } from '@shared/services/auth.service';
import { FirebaseService } from '@shared/services/firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  orders$: Observable<Order[]>;
  orderCode;
  constructor(private database: FirebaseService, private auth: AuthService, private store: Store, private router: Router) { }

  ngOnInit(): void {
    this.orders$ = this.database.getOrdersByUser(this.auth.getUserId()).pipe(
      map((results: any[]) => results.sort((a, b) => b.date - a.date)));
  }

  repeatOrder(orderItems: CartItem[]) {
    orderItems.forEach(item => {
      this.store.dispatch(addItem({ cartItem: item }))
    })
    this.router.navigate(['/cart']);
  }

  cancelOrder(order: Order) {
    order.status = "Declined";
    order.statusCode = StatusCode.DECLINED;
    this.database.updateOrder(order);
  }

  confirmOrder(order: Order) {
    order.status = "Completed";
    order.statusCode = StatusCode.COMPLETED;
    this.database.updateOrder(order);
  }

}
