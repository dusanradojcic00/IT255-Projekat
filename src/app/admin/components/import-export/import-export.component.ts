import { map } from 'rxjs/operators';
import { FirebaseService } from './../../../services/firebase.service';
import { ExcelHelper } from './../../../helpers/helper';
import { Product } from 'src/app/models/product.model';
import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
@Component({
  selector: 'app-import-export',
  templateUrl: './import-export.component.html',
  styleUrls: ['./import-export.component.css']
})
export class ImportExportComponent implements OnInit {
  isFileUploaded = false;
  products: Array<Product>;
  constructor(private database: FirebaseService) { }

  ngOnInit(): void {
  }

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
        return new Product(item.name, item.description, item.image, item.category, item.price, item.key);
      })
      this.isFileUploaded = true;
    }
    reader.readAsBinaryString(file);
  }

  onSubmit(){
    this.database.updateProducts(this.products);
  }

  downloadTemplate() {
    ExcelHelper.exportToFile([{ ...new Product() }], "products");
  }

  exportData(){
    let arr = [];
    this.database.getProducts().subscribe(item => {
      arr = item;
      ExcelHelper.exportToFile(arr, "products");
    })
  }

}
