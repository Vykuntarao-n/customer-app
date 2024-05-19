// src/app/customer/customer.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CustomerService, Customer } from '../customer.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent {

  customerForm: FormGroup;
  isUpdateMode = false;
  customerId!: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private customerService: CustomerService) {
    this.customerForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      address: ['']
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      const customerId = idParam ? +idParam : null;
      if (customerId) {
        this.isUpdateMode = true;
        this.customerId = customerId;
        this.customerService.getCustomerById(customerId).subscribe(customer => {
          this.customerForm.patchValue(customer);
        });
      }
    });
  }

  onSubmit(): void {
    const newCustomer: Customer = this.customerForm.value;
    if (this.isUpdateMode) {
      this.updateCustomer(newCustomer);
    } else {
      this.addCustomer(newCustomer);
    }
  }

  addCustomer(customer: Customer): void {
    this.customerService.addCustomer(customer).subscribe(response => {
      console.log('Customer created:', response);
    });
  }


  updateCustomer(customer: Customer): void {
    this.customerService.updateCustomer(this.customerId, customer).subscribe(response => {
      console.log('Customer updated:', response);
    });
  }

}
