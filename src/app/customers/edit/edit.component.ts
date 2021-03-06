import {Component, OnInit} from '@angular/core';
import {ICustomer} from "../../customer";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {CustomerService} from "../../customer.service";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  customer: ICustomer;
  editForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private customerService: CustomerService,
              private fb: FormBuilder,
              private router: Router) {
  }

  id = +this.route.snapshot.paramMap.get('id');

  ngOnInit(): void {
    this.editForm = this.fb.group({
      name: ['',[Validators.required]],
      phone: ['',[Validators.required,Validators.minLength(10),Validators.maxLength(12)]],
      email: ['',[Validators.required,Validators.email]],
    })
    this.customerService.getCustomerById(this.id).subscribe(
      res => {
        this.customer = res;
        this.editForm.patchValue(this.customer);
      },
      error => {
        console.log(error);
        this.customer = null;
      }
    );
  };
  get name(){
    return this.editForm.get('name')
  }
  get phone(){
    return this.editForm.get('phone')
  }
  get email(){
    return this.editForm.get('email')
  }
  update() {
    let customer = this.editForm.value;
    this.customerService.update(customer, this.id).subscribe(res => {
      console.log(res)
      this.router.navigate(['list'])
    })
  };

  viewList() {
    this.router.navigate(['list'])

  }
}
