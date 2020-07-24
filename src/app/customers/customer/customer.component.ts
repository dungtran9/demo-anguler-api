import {Component, OnInit} from '@angular/core';
import {ICustomer} from "../../customer";
import {FormControl} from "@angular/forms";
import {CustomerService} from "../../customer.service";

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  customersList: ICustomer[] = [];
  inputControl = new FormControl();

  constructor(private customerService: CustomerService) {
  }

  ngOnInit() {
    this.customerService.getAll().subscribe(respone => {
      this.customersList = respone;
    },error => {
      console.log(error)
    },()=>{
      console.log('complete')
    })
  }
  delete(i){
    const customer = this.customersList[i];
    this.customerService.delete(customer.id).subscribe(res=>{
      this.customersList=this.customersList.filter(cus => cus.id !== customer.id)
    })
  }

}
