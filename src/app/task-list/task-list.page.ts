import { Task } from './task/task.model';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-task-list',
    templateUrl: './task-list.page.html',
    styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {
    taskList: Task[] = [
        {
            requestDate: new Date(),
            ko: 'Mol',
            municipality: 'Ada',
            parcelNumber: '123/4 (1,3ha)',
            submitter: 'Petar Petrovic',
            tel: '063222-222-2',
            predCulture: 'Soja',
            culture: 'Kukuruz',
        },
        {
            requestDate: new Date(),
            ko: 'Ada',
            municipality: 'Ada',
            parcelNumber: '1238 (3,3ha)',
            submitter: 'Marko Markovic',
            tel: '063222-111-2',
            predCulture: 'Jabuka',
            culture: 'Jabuka',
        },
    ];

    constructor() {}

    ngOnInit() {}
}
