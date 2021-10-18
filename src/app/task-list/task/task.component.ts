import { Task } from './task.model';
import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NavigationExtras, Router } from '@angular/router';

@Component({
    selector: 'upz-task',
    templateUrl: './task.component.html',
    styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
    @Input() task: Task;

    constructor(private router: Router) {}

    ngOnInit() {}

    onClick(sufix: string) {
        let url = '';
        if (sufix === 'map') {
            url = '/tab/page/' + sufix;
        } else {
            url = sufix;
        }

        let navigationExtras: NavigationExtras = {
            state: {
                task: this.task,
            },
        };
        this.router.navigate([url], navigationExtras);
    }
}
