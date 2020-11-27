import { Observable } from 'rxjs';
import { Product } from '@shared/models/product.model';
import { FirebaseService } from '@shared/services/firebase.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  @Input() product: Product;
  categories$: Observable<any[]>;
  productForm: FormGroup;
  current = new Product();
  constructor(private fb: FormBuilder, private database: FirebaseService) {

  }

  ngOnInit() {
    this.categories$ = this.database.getCategories();
    this.productForm = this.fb.group({
      'name': [this.product.name, Validators.required],
      'price': [this.product.price, Validators.required],
      'description': [this.product.description, Validators.required],
      'image': [this.product.image, Validators.required],
      'category': [this.product.category, Validators.required]
    })
    this.current.key = this.product.key;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['product'].isFirstChange()) {
      this.productForm.setValue({
        name: this.product.name,
        price: this.product.price,
        description: this.product.description,
        image: this.product.image,
        category: this.product.category
      })
      this.current.key = this.product.key;
    }
  }

  onSubmit() {
    this.current.name = this.productForm.get('name').value;
    this.current.price = this.productForm.get('price').value;
    this.current.description = this.productForm.get('description').value;
    this.current.image = this.productForm.get('image').value;
    this.current.category = this.productForm.get('category').value;
    this.database.updateProduct(this.current).then(() => {
      console.log('Success')
    });
    return false;
  }

}
