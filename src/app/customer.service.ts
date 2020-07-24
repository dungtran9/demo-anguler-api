import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {ICustomer} from "./customer";

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  API_url = 'http://localhost:8000/api/customers'
  constructor(private http: HttpClient) {}
  getAll():Observable<ICustomer[]>{
    return this.http.get<ICustomer[]>(this.API_url);
  }
  add(customer: Partial<ICustomer>):Observable<ICustomer>{
    return this.http.post<ICustomer>(this.API_url+'/add',customer);
  }
  getCustomerById(id:number):Observable<ICustomer>{
    return this.http.get<ICustomer>(this.API_url+'/edit/'+id)
  }
  update(customer:ICustomer,id:number):Observable<ICustomer>{
    return this.http.put<ICustomer>(this.API_url+'/edit/'+id,customer);
  }
  delete(id:number):Observable<ICustomer>{
    return this.http.delete<ICustomer>(this.API_url+'/delete/'+id)
  }
}
