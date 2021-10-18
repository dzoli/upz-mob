import { NgForm } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-additional-info',
    templateUrl: './additional-info.page.html',
    styleUrls: ['./additional-info.page.scss'],
})
export class AdditionalInfoPage implements OnInit {
    constructor() {}

    ngOnInit() {}

    onSubmit(f: NgForm) {
        console.log(f);
    }

    onSaveClicked() {}
}
