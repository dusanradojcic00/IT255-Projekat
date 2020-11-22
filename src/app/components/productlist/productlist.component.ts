import { FirebaseService } from './../../services/firebase.service';
import { Observable } from 'rxjs';
import { Component, DoCheck, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnChanges {
  @Input() category;
  products: Observable<any>;
  constructor(private _service: FirebaseService) { }


  ngOnChanges(changes: SimpleChanges): void {
    if (changes.category) {
      this.products = this._service.getProductsByCategory(this.category.name);
    }
  }

}
