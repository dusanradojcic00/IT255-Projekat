import { FirebaseService } from '@shared/services/firebase.service';
import { Product } from '@shared/models/product.model';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  products$: Observable<any[]>;
  current: Product;
  currentIndex: number;
  constructor(private database: FirebaseService) { }

  ngOnInit(): void {
    this.products$ = this.database.getProducts();
  }

  setActiveProduct(product: Product, i: number) {
    this.current = product;
    this.currentIndex = i;
  }
}
