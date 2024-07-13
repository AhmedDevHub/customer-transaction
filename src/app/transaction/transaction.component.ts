import { Component, OnInit } from "@angular/core";
import { ChartConfiguration } from "chart.js";
import { DataService } from "../data.service";
import { Customer, Transaction } from "../interfaces";
import 'chartjs-adapter-date-fns';

interface CustomerDropdown {
  label: string;
  value: string;
}
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {

  customers: Customer[] = [];
  transactions: Transaction[] = [];
  filteredTransactions: Transaction[] = [];
  amountFilter: number | null = null;
  dateFilter: Date | null = null;
  customerIdToNameMap: { [key: string]: string } = {};
  selectedCustomer: string | null = null;
  barChartData: any;

  barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    indexAxis: 'x',
    scales: {
      x: {
        title: {
          display: true,
          text: 'Customer'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Amount'
        }
      }
    }
  };

  constructor(private _dataService: DataService) { }

  ngOnInit(): void {
    this.customers = this._dataService.getCustomers();
    this.transactions = this._dataService.getTransactions();
    this.customerIdToNameMap = this.buildCustomerIdToNameMap(this.customers);
    this.filteredTransactions = this.transactions;
    this.updateBarChartData();
  }

  filterTransactions(): void {
    this.filteredTransactions = this.transactions.filter(transaction => {
      const byAmount = this.amountFilter === null || transaction.amount === this.amountFilter;
      const byCustomer = !this.selectedCustomer || transaction.customer_id.toString() === this.selectedCustomer;
      const byDate = !this.dateFilter || transaction.date.includes(this.dateFilter.toISOString().split('T')[0]);
      return byAmount && byCustomer && byDate;
    });
    this.updateBarChartData();
  }

  updateBarChartData(): void {
    this.barChartData = {
      labels: this.filteredTransactions.map(transaction => this.getCustomerName(transaction.customer_id.toString())),
      datasets: [
        {
          data: this.filteredTransactions.map(transaction => transaction.amount),
          label: 'Transactions',
          borderWidth: 1
        },
      ],
    };
  }

  getTotalAmount(): number {
    return this.filteredTransactions.reduce((total, transaction) => total + transaction.amount, 0);
  }

  getUniqueCustomers(): CustomerDropdown[] {
    const uniqueCustomers = Array.from(new Set(this.transactions.map(transaction => transaction.customer_id.toString())));
    return [{ label: 'All Customers', value: '' }, ...uniqueCustomers.map(customerId => ({
      label: this.getCustomerName(customerId),
      value: customerId
    }))];
  }

  buildCustomerIdToNameMap(customers: Customer[]): { [key: string]: string } {
    const map: { [key: string]: string } = {};
    customers.forEach(customer => {
      map[customer.id.toString()] = customer.name;
    });
    return map;
  }

  getCustomerName(customerId: string): string {
    return this.customerIdToNameMap[customerId] || 'All Customers';
  }

  filterTransactionsByAmount(): void {
    if (this.amountFilter === null) {
      this.filteredTransactions = this.transactions;
    } else {
      const filterValue = this.amountFilter.toString();
      this.filteredTransactions = this.transactions.filter(transaction =>
        transaction.amount.toString().includes(filterValue)
      );
    }
    this.updateBarChartData();
  }
}