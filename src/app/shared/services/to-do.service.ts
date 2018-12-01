import { Injectable } from '@angular/core';
import {BaseApi} from './base-api.service';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable} from 'rxjs';
import {ToDoItemInterface} from '../interfaces/to-do.interface';

@Injectable()
export class ToDoService extends BaseApi {

  $addNewToDo = new BehaviorSubject<{}>({});
  $deleteToDo = new BehaviorSubject<{}>({});

  constructor(public http: HttpClient) {
    super(http);
  }

  getListUsersToDoList(): Observable<ToDoItemInterface[]> {
    return this.get(`to_do_list`);
  }

  upDateToDo(id: number, data: {title: string} | {description: string}): Observable<ToDoItemInterface> {
    return this.patch(`to_do_list/${id}`, data);
  }

  delToDo(id: number): Observable<{}> {
    return this.delete(`to_do_list/${id}`);
  }

  addToDo(toDo: ToDoItemInterface): Observable<ToDoItemInterface> {
    return this.post(`to_do_list`, toDo);
  }

}
