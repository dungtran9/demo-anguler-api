import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {CustomerComponent} from "./customers/customer/customer.component";
import {AddComponent} from "./customers/add/add.component";
import {EditComponent} from "./customers/edit/edit.component";


const routes: Routes = [
  {
    path: 'list',
    component: CustomerComponent
  },
  {
    path: 'list/add',
    component: AddComponent
  },
  {
    path : 'edit/:id',
    component : EditComponent
  },
  {
    path : 'delete/:id',
    component : CustomerComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
