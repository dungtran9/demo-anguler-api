import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {ICustomer} from "../../customer";
import {CustomerService} from "../../customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  customer: ICustomer[]=[];
  addForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.addForm=this.fb.group({
      name : [''],
      phone : [''],
      email : [''],
    })
  }
store(){
    let customer = this.addForm.value;
    this.customerService.add(customer).subscribe(res =>{
      console.log(res)
      this.router.navigate(['list'])

    });
}
}
