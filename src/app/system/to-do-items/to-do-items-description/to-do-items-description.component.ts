import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ToDoItemInterface} from '../../../shared/interfaces/to-do.interface';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {ToDoService} from '../../../shared/services/to-do.service';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-to-do-items-description',
  templateUrl: './to-do-items-description.component.html',
  styleUrls: ['./to-do-items-description.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ToDoItemsDescriptionComponent implements OnDestroy {

  @Input() toDoDescription: ToDoItemInterface;
  @ViewChild('formDescription') formDescription: NgForm;

  constructor(private toDoService: ToDoService,
              private cdr: ChangeDetectorRef) { }

  ngOnDestroy() {}

  saveDescription(id: number, value: string): void {
    this.toDoService.upDateToDo(id, {description: value})
      .pipe(untilDestroyed(this))
      .subscribe( (data: ToDoItemInterface) => {
        if (data) {
          this.toDoDescription.description = data.description;
          this.changeFlagEdit();
          this.cdr.detectChanges();
        }
      }, error => {
        console.log('ToDoItemsDescriptionComponent', error);
      });
  }

  changeFlagEdit(): void {
    this.toDoDescription.isEditDescription = !this.toDoDescription.isEditDescription;
  }
}
