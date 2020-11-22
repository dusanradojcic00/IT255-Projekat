import { Product } from './../models/product.model';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

  constructor(private _db: AngularFireDatabase) {

  }

  getCategories(): Observable<any> {
    const itemsRef: AngularFireList<any> = this._db.list('categories');
    return itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getCategory(id: string | null) {
    const itemsRef = this._db.object(`/categories/${id}`);
    return itemsRef.valueChanges()
  }

  getProducts(): Observable<any> {
    const itemsRef: AngularFireList<any> = this._db.list('products');
    return itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getProductsByCategory(category: string): Observable<any> {
    const itemsRef = this._db.list('/products', ref => ref.orderByChild('category').equalTo(category));
    return itemsRef.valueChanges();
  }

  getProduct(id: string) {
    const itemsRef = this._db.object(`/products/${id}`);
    return itemsRef.valueChanges()
  }

  getProductObject(id: string) {
    // const itemsRef = this._db.object<Product>(`/products/${id}`);
    // let product: Product;
    // itemsRef.valueChanges().subscribe(data => {
    //   product.name = data.name;
    //   product.description = data.description;
    //   product.image = data.image;
    //   product.categoryId = data.categoryId;
    //   product.options = data.options;
    // })
    // return product;
  }
}
