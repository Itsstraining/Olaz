import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports:[
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
    ],
    exports:[
        FormsModule,
        ReactiveFormsModule,
    ]
})

export class ShareModule {}