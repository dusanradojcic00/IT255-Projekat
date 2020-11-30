import { Product } from './../models/product.model';
import { DateHelper } from './../helpers/helper';
import { Order, StatusCode } from './../models/order.model';
import { Category } from './../models/category.model';
import { map } from 'rxjs/operators';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '@shared/models/user.model';
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
    const itemsRef: AngularFireObject<any> = this._db.object(`/categories/${id}`);
    return itemsRef.snapshotChanges().pipe(
      map((c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getNumberCategories(number: number): Observable<any> {
    const itemsRef: AngularFireList<any> = this._db.list('categories', ref => ref.limitToFirst(number));
    return itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getProducts(): Observable<any> {
    const itemsRef: AngularFireList<any> = this._db.list('products');
    return itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  getProductsByCategory(category): Observable<any> {
    const itemsRef = this._db.list('/products', ref => ref.orderByChild('category').equalTo(category.key));
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

  addProduct(product: Product): any {
    const itemsRef: AngularFireList<any> = this._db.list('products');
    return itemsRef.push(product);
  }

  addProducts(products: Product[]): any {
    const itemsRef: AngularFireList<any> = this._db.list('products');
    products.forEach(product => {
      itemsRef.push(product);
    });
  }

  updateProducts(products: Product[]): any {
    const itemsRef: AngularFireList<any> = this._db.list('products');
    products.forEach(product => {
      itemsRef.update(product.key, product);
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
    order.status = "Pending";
    order.statusCode = StatusCode.PENDING;
    const itemsRef: AngularFireList<any> = this._db.list('orders');
    return itemsRef.push(order);
  }

  getOrdersByUser(user: string): any {
    const itemsRef: AngularFireList<any> = this._db.list('orders', ref => ref.orderByChild('user').equalTo(user));
    return itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
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
    const itemsRef: AngularFireList<any> = this._db.list('orders');
    return itemsRef.snapshotChanges().pipe(
      map(changes =>
        changes.map(c => ({ key: c.payload.key, ...c.payload.val() }))
      )
    );
  }

  updateOrder(order: Order) {
    const itemsRef: AngularFireList<any> = this._db.list('orders');
    itemsRef.update(order.key, { statusCode: order.statusCode, status: order.status });
  }

  getUser(uid: string) {
    const userRef: AngularFireObject<any> = this._db.object(`users/${uid}`);
    return userRef.snapshotChanges().pipe(
      map((c => ({ key: c.payload.key, ...c.payload.val() })))
    );
  }

  addUser(id: string, email: string) {
    const itemsRef: AngularFireList<any> = this._db.list('users');
    const imgBlank = "https://firebasestorage.googleapis.com/v0/b/projekat-lager.appspot.com/o/images%2Fblank.png?alt=media&token=90b90bce-baba-4473-bdad-59f98427369f"
    return itemsRef.update(id, { email: email, img: imgBlank });
  }

  updateUserImg(user) {
    const itemsRef: AngularFireList<any> = this._db.list('users');
    return itemsRef.update(user.uid, { img: user.img });
  }

  updateUser(user) {
    console.log(user);
    const itemsRef: AngularFireList<any> = this._db.list('users');
    return itemsRef.update(user.uid, { ...user });
  }

  isCouponValid(code: string): Observable<boolean> {
    const itemsRef: AngularFireList<any> = this._db.list('coupons', ref => ref.orderByChild('code').equalTo(code));
    return itemsRef.valueChanges().pipe(map(item => item.length > 0));
  }

  getDiscount(code: string): Observable<any> {
    const itemsRef: AngularFireList<any> = this._db.list('coupons', ref => ref.orderByChild('code').equalTo(code));
    return itemsRef.valueChanges().pipe(map(item => item[0].discount));
  }


}
