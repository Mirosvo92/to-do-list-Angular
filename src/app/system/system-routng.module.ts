import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SystemComponent} from './system.component';
import {SystemGuard} from '../shared/guards/system.guard';


const routes: Routes = [
  {path: '', component: SystemComponent, canActivate: [SystemGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SystemRoutingModule {}
