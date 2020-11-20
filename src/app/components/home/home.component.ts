import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private _service: FirebaseService) {

  }

  ngOnInit(): void {
    this.items = this._service.getCategories();
  }

  addCategory() {
    const categoryRef = this.db.list('categories');
    categoryRef.push({ name: "Zestoko pice" });
  }

}
