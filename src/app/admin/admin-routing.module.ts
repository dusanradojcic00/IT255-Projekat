import { GraphComponent } from './components/graph/graph.component';
import { OrderListComponent } from './components/order-list/order-list.component';
import { ImportExportComponent } from './components/import-export/import-export.component';
import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { AddProductComponent } from './components/addproduct/addproduct.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '', component: DashboardComponent,
    children: [
      { path: '', component: GraphComponent },
      { path: 'addproduct', component: AddProductComponent, },
      { path: 'editproduct', component: EditProductComponent },
      { path: 'addcategory', component: AddcategoryComponent },
      { path: 'editcategory', component: EditCategoryComponent },
      { path: 'import-export', component: ImportExportComponent },
      { path: 'orders', component: OrderListComponent },
    ]
  },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
