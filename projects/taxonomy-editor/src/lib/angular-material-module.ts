import { NgModule } from '@angular/core';
import { MatButtonModule, MatFormFieldModule, MatIconModule, MatInputModule } from '@angular/material';


@NgModule({
    imports: [ 
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ],
    exports: [
        MatFormFieldModule,
        MatButtonModule,
        MatInputModule,
        MatIconModule,
    ]
})
export class AngularMaterialModule { }