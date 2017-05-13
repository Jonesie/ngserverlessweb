import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { KiwianaComponent } from './kiwiana.component';

@NgModule({
    declarations : [
        KiwianaComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [
        CommonModule,
        FormsModule,
        KiwianaComponent
    ]
})
export class SharedModule { }
