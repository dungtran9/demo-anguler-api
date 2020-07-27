import {Component, OnInit} from '@angular/core';
import {ICustomer} from "../../customer";
import {FormBuilder, FormControl} from "@angular/forms";
import {CustomerService} from "../../customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  title = 'Customer List';
  customersList: ICustomer[] = [];

  constructor(private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.customerService.getAll().subscribe(respone => {
      this.customersList = respone;
      this.customerListSearch = this.customersList;
    }, error => {
      console.log(error)
    }, () => {
      console.log('complete')
    })
  }
  customerListSearch = [];
  delete(i) {
    const customer = this.customersList[i];
    this.customerService.delete(customer.id).subscribe(res => {
      this.customerListSearch = this.customerListSearch.filter(cus => cus.id !== customer.id)
      this.router.navigate(['list'])
    })
  }

  search(event: any) {
    let keyword = event.target.value.toLowerCase();
    this.customerListSearch = keyword ? this.customerFilter(keyword) : this.customersList;
    console.log(this.customerListSearch)
  }

  customerFilter(keyword: string) {
    return this.customersList.filter(customer => {
      return customer.name.toLowerCase().indexOf(keyword) != -1;
    });
  }
}
