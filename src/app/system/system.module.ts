import { NgModule } from '@angular/core';
import { SystemComponent } from './system.component';
import {SharedModule} from '../shared/shared.module';
import {SystemRoutingModule} from './system-routng.module';
import { ToDoComponent } from './to-do/to-do.component';
import {SystemGuard} from '../shared/guards/system.guard';
import { ToDoItemsComponent } from './to-do-items/to-do-items.component';
import { ToDoFilterComponent } from './to-do-filter/to-do-filter.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { ToDoItemsTitleComponent } from './to-do-items/to-do-items-title/to-do-items-title.component';
import { ToDoItemsDescriptionComponent } from './to-do-items/to-do-items-description/to-do-items-description.component';



@NgModule({
  declarations: [
  SystemComponent,
  ToDoComponent,
  ToDoItemsComponent,
  ToDoFilterComponent,
  UserSettingComponent,
  ToDoItemsTitleComponent,
  ToDoItemsDescriptionComponent,
 ],
  imports: [
    SharedModule,
    SystemRoutingModule
  ],
  providers: [SystemGuard]
})
export class SystemModule {}
