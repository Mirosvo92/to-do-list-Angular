import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {ToDoItemInterface} from '../../shared/interfaces/to-do.interface';
import {ToDoService} from '../../shared/services/to-do.service';
import {untilDestroyed} from 'ngx-take-until-destroy';

@Component({
  selector: 'app-to-do-items',
  templateUrl: './to-do-items.component.html',
  styleUrls: ['./to-do-items.component.scss'],
})

export class ToDoItemsComponent implements OnDestroy {

  @Input() toDoItemsList: ToDoItemInterface[];
  @Output() deleToDo = new EventEmitter();

  constructor(private toDoService: ToDoService) { }

  ngOnDestroy() {
  }

  deleteItem(id: number): void {
    this.toDoService.delToDo(id)
      .pipe(untilDestroyed(this))
      .subscribe( (data: {}) => {
      if (data) {
        this.deleToDo.emit(id);
      }
    }, error => {
      console.log('ToDoItemsComponent', error);
    });
  }

}
