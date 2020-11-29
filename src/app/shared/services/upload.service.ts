import { getUser } from './../../store/user/user.reducer';
import { Store, select } from '@ngrx/store';
import { FirebaseService } from '@shared/services/firebase.service';
import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { User } from '@shared/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private storage: AngularFireStorage, private database: FirebaseService, private store: Store) { }

  uploadFile(file): AngularFireUploadTask {
    const filePath = `images/${file.name}`;
    const fileRef = this.storage.ref(filePath);
    const task = this.storage.upload(filePath, file);
    task.snapshotChanges().pipe(
      finalize(() => this.editProfile(fileRef.getDownloadURL()))
    )
      .subscribe()
    return task;
  }

  editProfile(imageUrl) {
    imageUrl.subscribe(image => {
      let user = new User();
      this.store.pipe(select(getUser)).subscribe(item => {
        user = {...item, img: image}
      })
      this.database.updateUser(user);
    })
  }
}

