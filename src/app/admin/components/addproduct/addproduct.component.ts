import { Observable } from 'rxjs';
import { FirebaseService } from './../../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-addproduct',
  templateUrl: './addproduct.component.html',
  styleUrls: ['./addproduct.component.css']
})
export class AddProductComponent implements OnInit {
  categories$: Observable<any[]>;
  productForm: FormGroup;
  constructor(private _database: FirebaseService, private fb: FormBuilder) { 
    this.productForm = this.fb.group({
      'name': ['', Validators.required],
      'price': ['', Validators.required],
      'description': ['', Validators.required],
      'image': ['', Validators.required],
      'category': ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.categories$ = this._database.getCategories();
  }

  onSubmit(){
    const name = this.productForm.get('name').value;
    const price = this.productForm.get('price').value;
    const description = this.productForm.get('description').value;
    const image = this.productForm.get('image').value;
    const category = this.productForm.get('category').value;
    let product = new Product(name, description, image, category, price);
    this._database.addProduct(product);
    return false;
  }

}
