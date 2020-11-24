import { EditProductComponent } from './components/edit-product/edit-product.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { AddcategoryComponent } from './components/addcategory/addcategory.component';
import { AddProductComponent } from './components/addproduct/addproduct.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'addproduct', component: AddProductComponent },
  { path: 'editproduct', component: EditProductComponent },
  { path: 'addcategory', component: AddcategoryComponent },
  { path: 'editcategory', component: EditCategoryComponent },
  { path: '**', component: DashboardComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
