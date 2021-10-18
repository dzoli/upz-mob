import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'upz-analysis',
    templateUrl: './analysis.page.html',
    styleUrls: ['./analysis.page.scss'],
})
export class AnalysisPage implements OnInit {
    constructor() {}

    ngOnInit() {}

    onSubmit(f: NgForm) {
        console.log(f);
    }

    onSaveClicked() {}
}
