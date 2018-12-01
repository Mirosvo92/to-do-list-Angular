import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import * as moment from 'moment';
import {disabledBut} from '../../shared/helpers/functions';
import {ToDoItemInterface} from '../../shared/interfaces/to-do.interface';

@Component({
  selector: 'app-to-do-filter',
  templateUrl: './to-do-filter.component.html',
  styleUrls: ['./to-do-filter.component.scss']
})
export class ToDoFilterComponent implements OnInit, OnChanges {

  @ViewChild('formFilter') formFilter: NgForm;
  @Input() toDoData: ToDoItemInterface[];
  @Input() cloneToDoListData: ToDoItemInterface[];
  @Output() sendFilterData = new EventEmitter();
  dateSelect: string[];
  isSendReq = {send: false};

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['cloneToDoListData'] && changes['cloneToDoListData'].currentValue) {
      this.cloneToDoListData = changes['cloneToDoListData'].currentValue;
      this.setDateArray(this.cloneToDoListData);
    }
  }

  filter() {
    disabledBut(this.isSendReq);
    const dataFormFilter = this.formFilter.value;
    // namesFilterField = [title, created_at]
    const namesFilterField = Object.keys(dataFormFilter);
    this.sendFilterData.emit(this.sortArrByFilter(namesFilterField, dataFormFilter));
  }

  private sortArrByFilter(keys: string[], data: ToDoItemInterface[]): any {
    let sortData = this.cloneToDoListData;
    keys.forEach( nameProp => {
      sortData = sortData.filter( currentElement => {
        const filterProp = !!data[nameProp] ? data[nameProp] : currentElement[nameProp];
        return currentElement[nameProp] === filterProp;
      });
    });
    return sortData;
  }

  private setDateArray(arr: ToDoItemInterface[]): void {
    this.dateSelect = [];
    arr.forEach( el => {
      if (this.dateSelect.indexOf(el['created_at']) === -1) {
        this.dateSelect.push(el['created_at']);
      }
    });
    this.sortDate(this.dateSelect);
  }

  private sortDate(arr: string[]): void {
    arr.sort((a, b) => {
      const dateA = moment(a, 'YYYY/DD/MM');
      const dateB = moment(b, 'YYYY/DD/MM');
      return dateA.diff(dateB);
    });
  }
}
