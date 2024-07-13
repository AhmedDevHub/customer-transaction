import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CustomerComponent } from './customer/customer.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  {
    path: '', 
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'customers', pathMatch: 'full' },
      { path: 'customers', component: CustomerComponent, title: 'Customers' },
      { path: 'transactions', component: TransactionComponent, title: 'Transactions' },
    ]
  },
  { path: '**', component: NotfoundComponent, title: '404 Not Found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
