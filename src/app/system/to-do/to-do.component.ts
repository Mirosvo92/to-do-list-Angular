import {ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {ToDoService} from '../../shared/services/to-do.service';
import * as moment from 'moment';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {disabledBut} from '../../shared/helpers/functions';


@Component({
  selector: 'app-to-do',
  templateUrl: './to-do.component.html',
  styleUrls: ['./to-do.component.scss']
})
export class ToDoComponent implements OnDestroy {

  @ViewChild('formCreateEvent') formCreateEvent: NgForm;
  isSendReq = {send: false};

  constructor(private toDoService: ToDoService) { }

  ngOnDestroy() {
  }

  addToDo(): void {
    disabledBut(this.isSendReq);
    const dataToDo = this.formCreateEvent.value;
    dataToDo['created_at'] = moment().format('YYYY-DD-MM');
    this.toDoService.addToDo(dataToDo)
      .pipe(untilDestroyed(this))
      .subscribe( data => {
        if (data) {
          this.toDoService.$addNewToDo.next(data);
          this.formCreateEvent.reset();
        }
    });
  }

}
