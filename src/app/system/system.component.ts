import {Component, OnDestroy, OnInit} from '@angular/core';
import {ToDoService} from '../shared/services/to-do.service';
import {ToDoItemInterface} from '../shared/interfaces/to-do.interface';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {addFlagChanges} from '../shared/helpers/functions';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit, OnDestroy {

  toDoListData: ToDoItemInterface[];
  // cloneObjectListData an array that will store all current objects, it is necessary for filter
  cloneObjectListData: ToDoItemInterface[];

  constructor(private toDoService: ToDoService) { }

  ngOnInit() {
    this.toDoService.getListUsersToDoList()
      .pipe(untilDestroyed(this))
      .subscribe( (data: ToDoItemInterface[]) => {
        if (data) {
          this.toDoListData = data.reverse();
          addFlagChanges(this.toDoListData);
          // this.setDateArray(this.toDoListData);
          this.cloneObjectListData = JSON.parse(JSON.stringify(this.toDoListData));
        }
    }, error => {
      console.log('system', error);
    });
    // add
    this.initAddNewToDo();
  }

  ngOnDestroy() {}

  delete(id: number): void {
    this.toDoListData = this.toDoListData.filter( el => {
      return el['id'] !== id;
    });
    this.delElCloneObject(id);
  }

  filter(data: ToDoItemInterface[]) {
    this.toDoListData = data;
  }

  private delElCloneObject(id: number): void {
    this.cloneObjectListData = this.cloneObjectListData.filter( el => {
      return el['id'] !== id;
    });
  }

  private addElCloneObject(data: ToDoItemInterface): void {
    this.cloneObjectListData.unshift(data);
    this.cloneObjectListData = [...this.cloneObjectListData];
  }

  private initAddNewToDo(): void {
    this.toDoService.$addNewToDo
      .pipe(untilDestroyed(this))
      .subscribe( (data: ToDoItemInterface) => {
        if (Object.keys(data).length) {
          addFlagChanges([data]);
          this.addElCloneObject(data);
          this.toDoListData = this.cloneObjectListData;
        }
      });
  }

}
