import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToDoItemInterface} from '../../../shared/interfaces/to-do.interface';
import {ToDoService} from '../../../shared/services/to-do.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-to-do-items-title',
  templateUrl: './to-do-items-title.component.html',
  styleUrls: ['./to-do-items-title.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoItemsTitleComponent implements  OnDestroy {

  @Input() toDoTitle: ToDoItemInterface;
  @ViewChild('formTitle') formTitle: NgForm;

  constructor(private toDoService: ToDoService,
              private cdr: ChangeDetectorRef) { }

  ngOnDestroy() {}

  saveTitle(id: number, value: string): void {
    this.toDoService.upDateToDo(id, {title: value})
      .pipe(untilDestroyed(this))
      .subscribe( (data: ToDoItemInterface) => {
        if (data) {
          this.toDoTitle.title = data.title;
          this.changeFlagEdit();
          this.cdr.detectChanges();
        }
      }, error => {
        console.log('ToDoItemsTitleComponent', error);
      });
  }

  changeFlagEdit(): void {
    this.toDoTitle.isEditTitle = !this.toDoTitle.isEditTitle;
  }


}
