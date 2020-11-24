import { DateHelper } from './../helpers/helper';
import { Order } from './../models/order.model';
import { Category } from './../models/category.model';
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

  addProduct(product: Product) {
    const itemsRef: AngularFireList<any> = this._db.list('products');
    itemsRef.push(product);
  }

  addProducts(products: Product[]): any {
    const itemsRef: AngularFireList<any> = this._db.list('products');
    products.forEach(product => {
      itemsRef.push(product);
    });
  }

  updateProduct(product: Product): any {
    const itemsRef: AngularFireList<any> = this._db.list('products');
    console.log(product.key)
    return itemsRef.update(product.key, product);
  }

  addCategory(category: string): any {
    const itemsRef: AngularFireList<any> = this._db.list('categories');
    return itemsRef.push({ name: category });
  }

  updateCategory(category: Category) {
    const itemsRef: AngularFireList<any> = this._db.list('categories');
    itemsRef.update(category.key, { name: category.name });
  }

  deleteCategory(category: Category) {
    const itemsRef: AngularFireList<any> = this._db.list('categories');
    itemsRef.remove(category.key)
  }

  addOrder(order: Order): any {
    order.date = Date.now();
    order.month = DateHelper.getMonth();
    const itemsRef: AngularFireList<any> = this._db.list('orders');
    return itemsRef.push(order);
  }

  getOrdersByUser(user: string): any {
    const itemsRef = this._db.list('orders', ref => ref.orderByChild('user').equalTo(user));
    return itemsRef.valueChanges();
  }

  getOrdersByDate(date: string): any {
    const itemsRef = this._db.list('orders', ref => ref.orderByChild('date').equalTo(date));
    return itemsRef.valueChanges();
  }

  getOrdersByMonth(month: string): any {
    const itemsRef = this._db.list('orders', ref => ref.orderByChild('month').equalTo(month));
    return itemsRef.valueChanges();
  }

  getAllOrders(): any {
    const itemsRef = this._db.list('orders');
    return itemsRef.valueChanges();

  }
}
