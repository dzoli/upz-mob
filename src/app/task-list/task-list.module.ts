import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TaskListPageRoutingModule } from './task-list-routing.module';

import { TaskListPage } from './task-list.page';
import { TaskComponent } from './task/task.component';

@NgModule({
    imports: [CommonModule, FormsModule, IonicModule, TaskListPageRoutingModule],
    exports: [TaskComponent],
    declarations: [TaskListPage, TaskComponent],
})
export class TaskListPageModule {}
