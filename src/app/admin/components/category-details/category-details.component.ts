import { FirebaseService } from '@shared/services/firebase.service';
import { Category } from '@shared/models/category.model';
import { Component, DoCheck, Input, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-category-details',
  templateUrl: './category-details.component.html',
  styleUrls: ['./category-details.component.css']
})
export class CategoryDetailsComponent implements OnInit, OnChanges {
  @Input() category: Category;
  categoryForm: FormGroup;
  current: Category;
  constructor(private fb: FormBuilder, private database: FirebaseService) {

  }

  ngOnInit(): void {
    this.categoryForm = this.fb.group({
      name: [this.category.name, Validators.required]
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!changes['category'].isFirstChange()) {
      this.categoryForm.setValue({
        name: this.category.name
      })
    }
  }

  onSubmit() {
    this.category.name = this.categoryForm.get('name').value;
    this.database.updateCategory(this.category);
    return false;
  }

  onDelete() {
    if (confirm("Are you sure you want to delete this category?")) {
      this.category.name = this.categoryForm.get('name').value;
      this.database.deleteCategory(this.category);
      this.category = null;
      this.categoryForm.setValue({
        name: ''
      })
    }
  }
}
