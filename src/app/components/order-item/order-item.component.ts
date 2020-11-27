import { DateHelper } from '@shared/helpers/helper';
import { Order } from '@shared/models/order.model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-order-item',
  templateUrl: './order-item.component.html',
  styleUrls: ['./order-item.component.css']
})
export class OrderItemComponent implements OnInit {
  @Input() order: Order;
  @Output() repeat = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

  getDate(timestamp: number): string {
    return DateHelper.millisToDate(timestamp);
  }

  repeatOrder(){
    this.repeat.emit(this.order.products);
  }

  cancelOrder(){
    if(confirm('Are you sure?'))
    this.cancel.emit(this.order);
  }

  sendInvoice(){
    alert("Invoice sent");
  }

  confirmOrder(){
    this.confirm.emit(this.order);
  }
  
}
