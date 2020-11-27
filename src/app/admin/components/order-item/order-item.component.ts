import { StatusCode, Order } from '@shared/models/order.model';
import { DateHelper } from '@shared/helpers/helper';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  @Output() accept = new EventEmitter();
  @Output() decline = new EventEmitter();
  @Output() ship = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getDate(timestamp: number): string {
    return DateHelper.millisToDate(timestamp);
  }

  acceptOrder() {
    this.accept.emit(this.order);
  }

  declineOrder() {
    this.decline.emit(this.order);
  }

  shipOrder() {
    this.ship.emit(this.order)
  }

  sendInvoice() {
    alert('Invoice sent');
  }

}
