import { DateHelper } from '@shared/helpers/helper';
import { Order, StatusCode } from '@shared/models/order.model';
import { Observable } from 'rxjs';
import { FirebaseService } from '@shared/services/firebase.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.css']
})
export class OrderListComponent implements OnInit {
  orders$: Observable<Order[]>;
  orderCode;
  constructor(private database: FirebaseService) { }

  ngOnInit(): void {
    this.orders$ = this.database.getAllOrders();
  }




  acceptOrder(order: Order) {
    order.status = "Accepted";
    order.statusCode = StatusCode.AWAITING_SHIPPING;
    this.database.updateOrder(order);
  }

  declineOrder(order: Order) {
    order.status = "Declined";
    order.statusCode = StatusCode.DECLINED;
    this.database.updateOrder(order);
  }

  shipOrder(order: Order) {
    order.status = "Shipped";
    order.statusCode = StatusCode.SHIPPED;
    this.database.updateOrder(order);
  }

  sendInvoice(order: Order) {
    alert('Invoice sent');
  }

}
