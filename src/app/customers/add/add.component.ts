import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ICustomer} from "../../customer";
import {CustomerService} from "../../customer.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  customer: ICustomer[] = [];
  addForm: FormGroup;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private customerService: CustomerService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.addForm = this.fb.group({
      name: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      email: ['',[Validators.required,Validators.email]],
    })
  }
 get name(){
    return this.addForm.get('name')
 }
  get phone(){
    return this.addForm.get('phone')
  }
  get email(){
    return this.addForm.get('email')
  }
  store() {
    let customer = this.addForm.value;
    this.customerService.add(customer).subscribe(res => {
      console.log(res)
      this.router.navigate(['list'])

    });
  }

  viewList() {
    this.router.navigate(['list'])

  }
}
