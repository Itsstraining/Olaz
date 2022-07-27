import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { NotifierModule } from 'angular-notifier';

@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NotifierModule.withConfig({}),
    ],
    exports:[
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class ShareModule {}