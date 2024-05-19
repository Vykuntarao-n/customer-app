// src/app/customer-list/customer-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent implements OnInit {
  customers: Customer[] = [];

  constructor(private router: Router, private customerService: CustomerService) { }

  ngOnInit(): void {
    this.getCustomers();
  }

  getCustomers(): void {
    this.customerService.getCustomers().subscribe(data => {
      this.customers = data;
    });
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.customers = this.customers.filter(customer => customer.id !== id);
    });
  }

  navigateToUpdate(customerId: number): void {
    this.router.navigate(['/customer', customerId]);
  }
}
