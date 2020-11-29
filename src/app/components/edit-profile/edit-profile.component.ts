import { map } from 'rxjs/operators';
import { getUser } from './../../store/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { FirebaseService } from '@shared/services/firebase.service';
import { User } from '@shared/models/user.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UploadService } from './../../shared/services/upload.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  file: File;
  profileForm: FormGroup;
  user;
  constructor(private upload: UploadService, private fb: FormBuilder, private store: Store, private database: FirebaseService) {
    this.profileForm = this.fb.group({
      'name': [],
      'surname': [],
      'adress': [],
      'phone': [],
      'company': [],
      'companyAdress': []
    });
  }

  ngOnInit(): void {
    this.store.pipe(select(getUser)).subscribe((item) => {
      this.database.getUser(item.uid).pipe(map(item => {
        this.user = item;
      })).subscribe(() => {
        this.profileForm.setValue({
          name: this.user.name,
          surname: this.user.surname,
          adress: this.user.adress,
          phone: this.user.phone,
          company: this.user.company,
          companyAdress: this.user.companyAdress
        })
      });

    })


  }

  submitForm(){
    const name = this.profileForm.get('name').value;
    const surname = this.profileForm.get('surname').value;
    const adress = this.profileForm.get('adress').value;
    const phone = this.profileForm.get('phone').value;
    const company = this.profileForm.get('company').value;
    const companyAdress = this.profileForm.get('companyAdress').value;

    let newUser = {
      uid: this.user.key,
      name: name,
      surname: surname,
      adress: adress,
      phone: phone,
      company: company,
      companyAdress: companyAdress
    }

    this.database.updateUser(newUser);
  }

  uploadFile(event) {
    this.file = event.target.files[0];
  }

  submitImage() {
    const task = this.upload.uploadFile(this.file);
    task.percentageChanges().subscribe(item => {
      console.log(item);
    })
  }

}
