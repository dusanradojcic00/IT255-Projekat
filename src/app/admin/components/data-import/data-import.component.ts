import { ExcelHelper } from '@shared/helpers/helper';
import { FirebaseService } from '@shared/services/firebase.service';
import { Product } from '@shared/models/product.model';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-data-import',
  templateUrl: './data-import.component.html',
  styleUrls: ['./data-import.component.css']
})
export class DataImportComponent {
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
      this.products = jsonData.products.map(item => {
        return new Product(item.name, item.description, item.image, item.category, item.price);
      })
      this.isFileUploaded = true;
    }
    reader.readAsBinaryString(file);
  }

  onSubmit() {
    this.database.addProducts(this.products);
  }



  downloadTemplate() {
    let arr = [{... new Product()}];
    ExcelHelper.exportToFile(arr, "template");
  }

}
