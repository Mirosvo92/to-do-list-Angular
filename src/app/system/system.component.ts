import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {ToDoService} from '../shared/services/to-do.service';
import {ToDoItemInterface} from '../shared/interfaces/to-do.interface';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {addFlagChanges} from '../shared/helpers/functions';
import index from '@angular/cli/lib/cli';

@Component({
  selector: 'app-system',
  templateUrl: './system.component.html',
  styleUrls: ['./system.component.scss'],
})
export class SystemComponent implements OnInit, OnDestroy {

  toDoListData: ToDoItemInterface[];
  toDoListDataPagination: ToDoItemInterface[];
  // cloneObjectListData an array that will store all current objects, it is necessary for filter
  cloneObjectListData: ToDoItemInterface[];
  dataPagination = { countElements: 6};

  constructor(private toDoService: ToDoService,
              private cdr: ChangeDetectorRef) { }

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
  }

  ngOnDestroy() {}

  delete(id: number): void {
    this.toDoListData = this.toDoListData.filter( el => {
      return el['id'] !== id;
    });
    this.delElCloneObject(id);
  }

  add(data: ToDoItemInterface): void {
    addFlagChanges([data]);
    this.addElCloneObject(data);
    this.toDoListData = this.cloneObjectListData;
  }

  filter(data: ToDoItemInterface[]) {
    this.toDoListData = data;
  }

  setDataByPagination(data: {startIndex: number, endIndex: number}): void {
    this.toDoListDataPagination = this.toDoListData.slice(data.startIndex, data.endIndex + 1);
    this.cdr.detectChanges();
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

}
