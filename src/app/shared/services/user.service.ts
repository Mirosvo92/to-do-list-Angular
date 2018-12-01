import { Injectable } from '@angular/core';
import {BaseApi} from './base-api.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user.model';


@Injectable()
export class UsersService extends BaseApi {

  id: number;

  get userId(): number {
    return this.userId;
  }

  set userId(id: number) {
    this.id = id;
  }

  constructor(public http: HttpClient) {
    super(http);
    const isUser = localStorage.getItem('user');
    if (isUser) {
      this.userId = +isUser;
    }
  }

  getUserByEmail(email: string): Observable<User[]> {
    return this.get(`users?email=${email}`);
  }

  createNewUser(user: User): Observable<User> {
    return this.post('users', user);
  }

  getInfoAboutUser(id: number): Observable<User[]> {
    return this.get(`users?id=${id}`);
  }



}
