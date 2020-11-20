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
}
