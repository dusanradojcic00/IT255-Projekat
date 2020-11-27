import { FirebaseService } from '@shared/services/firebase.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  item$: Observable<any>;
  categories$: Observable<any[]>
  constructor(private route: ActivatedRoute, private router: Router, private _service: FirebaseService) {

  }

  ngOnInit(): void {
    this.categories$ = this._service.getCategories();
    this.route.paramMap.subscribe(params => {
      this.item$ = this._service.getCategory(params.get('id'));
    });
  }

}
