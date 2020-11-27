import { Order } from './../models/order.model';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FilterService } from './../services/filter.service';
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  constructor(private service: FilterService) { }

  transform(value: Observable<Order[]>, code: number): Observable<Order[]> {
    return value.pipe(
      map(item => {
        if (!code) {
          return item;
        }

        let filteredOrders: Order[] = [];
        filteredOrders = item.filter(order => order.statusCode == code);
        return filteredOrders;
      })
    )
  }


}
