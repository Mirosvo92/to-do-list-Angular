import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {ToDoItemInterface} from '../../shared/interfaces/to-do.interface';


@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {

  @Input() toDoData: ToDoItemInterface[];
  @Input() settingsPagination: {countElements: number};
  @Output() setPagination = new EventEmitter();
  numbersPage: number[] = [];
  activePage = 1;

  constructor() { }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['toDoData'] && changes['toDoData'].currentValue) {
      this.toDoData = changes['toDoData'].currentValue;
      this.setCountPage(this.toDoData, this.settingsPagination.countElements);
      this.setCountItemsOnPage(this.activePage, this.settingsPagination.countElements);
    }
  }

  setCurrentPage(page: number) {
    this.activePage = page;
    this.setCountItemsOnPage(page, this.settingsPagination.countElements);
  }

  private setCountItemsOnPage(page: number, countOnPage: number): void {
    // if we delete element, set the firs page
    if (this.numbersPage.indexOf(this.activePage) === -1) {
      this.activePage = 1;
      page = 1;
    }
    const startIndex = (page - 1) * countOnPage;
    const endIndex = Math.min(startIndex + countOnPage - 1, this.toDoData.length);
    this.setPagination.emit({startIndex, endIndex});
  }

  private setCountPage(arr, countOnPage): void {
    let count = 0;
    arr.forEach( (el, i) => {
      if (i % countOnPage === 0) {
        count++;
      } else if (i === countOnPage.length - 1 && i % countOnPage > 0) {
        count++;
      }
    });
    this.createArrayPage(count);
  }

  private createArrayPage(len): void {
    this.numbersPage = [];
    for (let i = 1; i <= len; i++) {
      this.numbersPage.push(i);
    }
  }

}
