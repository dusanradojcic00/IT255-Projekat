import { Category } from '@shared/models/category.model';
import { FirebaseService } from '@shared/services/firebase.service';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css']
})
export class EditCategoryComponent implements OnInit {
  categories$: Observable<any[]>
  current: Category;
  currentIndex: number;
  constructor(private _service: FirebaseService) { }

  ngOnInit(): void {
    this.categories$ = this._service.getCategories();
  }

  setActiveCategory(category: Category, i: number){
    this.current = category;
    this.currentIndex = i;
  }

}
