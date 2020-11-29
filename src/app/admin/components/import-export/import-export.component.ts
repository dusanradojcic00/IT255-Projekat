import { map } from 'rxjs/operators';
import { FirebaseService } from '@shared/services/firebase.service';
import { ExcelHelper } from '@shared/helpers/helper';
import { Product } from '@shared/models/product.model';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent {
  isFileUploaded = false;
  products: Array<Product>;
  constructor(private database: FirebaseService) { }


  onFileChange(ev) {
    let workBook = null;
    let jsonData = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial, name) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.products = jsonData.products.map(item => Object.assign({}, item));
      this.isFileUploaded = true;
    }
    reader.readAsBinaryString(file);
  }

  uploadData(){
    console.log(2);
    this.database.updateProducts(this.products);
  }

  exportData(){
    console.log(1);
    this.database.getProducts().subscribe(item => {
      ExcelHelper.exportToFile(item, "products");
    })
  }

}
