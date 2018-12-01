import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {CommonModule} from '@angular/common';
import {UsersService} from './services/user.service';
import {BaseApi} from './services/base-api.service';
import {AuthService} from './services/auth.service';
import {ToDoService} from './services/to-do.service';


@NgModule({
  imports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    UsersService,
    BaseApi,
    AuthService,
    ToDoService
  ],
  exports: [
    ReactiveFormsModule,
    FormsModule,
    CommonModule
  ]
})
export class SharedModule {}
