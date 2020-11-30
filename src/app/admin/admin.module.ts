import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartsModule } from 'ng2-charts';
import { AdminRoutingModule } from './admin-routing.module';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddProductComponent } from './components/addproduct/addproduct.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { DataImportComponent } from './components/data-import/data-import.component';
import { ImportExportComponent } from './components/import-export/import-export.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { OrderItemComponent } from './components/order-item/order-item.component';
import { GraphComponent } from './components/graph/graph.component';


@NgModule({
  declarations: [DashboardComponent, AddProductComponent, AddcategoryComponent, EditCategoryComponent, CategoryDetailsComponent, EditProductComponent, ProductDetailsComponent, DataImportComponent, ImportExportComponent, OrderListComponent, OrderItemComponent, GraphComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    SharedModule
  ],
})
export class AdminModule { }
