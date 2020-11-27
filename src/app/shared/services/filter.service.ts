import { map } from 'rxjs/operators';
import { Order } from './../models/order.model';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  constructor() { }

  filterOrders(orders: Observable<Order[]>, code: number): Observable<Order[]> {
    return orders.pipe(
      map(item => {
        if (!code){
          return item;
        }

        let filteredOrders: Order[] = [];
        filteredOrders = item.filter(order => order.statusCode = code);
        return filteredOrders;
      })
    )
  }
}
