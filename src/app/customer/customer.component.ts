import { Component } from "@angular/core";
import { DataService } from "../data.service";
import { Customer } from "../interfaces";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent {
  customers: Customer[] = [];
  filteredCustomers: Customer[] = [];
  customerNameFilter: string = '';

  constructor(private _dataService: DataService) {}

  ngOnInit(): void {
    this.customers = this._dataService.getCustomers();
    this.filterCustomersByName();
  }

  filterCustomersByName(): void {
    this.filteredCustomers = this.customers.filter(customer =>
      customer.name.toLowerCase().includes(this.customerNameFilter.toLowerCase())
    );
  }
}
