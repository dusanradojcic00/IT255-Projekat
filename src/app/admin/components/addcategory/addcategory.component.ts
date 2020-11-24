import { FirebaseService } from './../../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-addcategory',
  templateUrl: './addcategory.component.html',
  styleUrls: ['./addcategory.component.css']
})
export class AddcategoryComponent implements OnInit {
  categoryForm: FormGroup;
  submitted = false;
  constructor(private fb: FormBuilder, private database: FirebaseService) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required]
    })

  }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.categoryForm.invalid) {
      return false;
    }
    const category = this.categoryForm.get('name').value;
    this.database.addCategory(category).then(() => {
      this.submitted = true;
    })
    return false;
  }

  closeAlert() {
    this.submitted = false;
  }

  get name() { return this.categoryForm.get('name'); }

}
