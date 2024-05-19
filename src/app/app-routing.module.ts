// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { CustomerListComponent } from './customer-list/customer-list.component';



const routes: Routes = [
  { path: 'customer', component: CustomerComponent },
  { path: 'customer/:id', component: CustomerComponent },
  { path: 'customer-list', component: CustomerListComponent },
  { path: '', redirectTo: '/customer-list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
