import { FirebaseService } from './../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  items: Observable<any[]>;
  constructor(private db: AngularFireDatabase, private _service: FirebaseService) {
  }

  ngOnInit(): void {
    this.items = this._service.getCategories();
  }

}
