import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReviewComponent } from '../baby-sitting/review/review.component';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
      ReviewComponent
    ],
    imports: [
      CommonModule,
      FormsModule
    ],
    exports: [
      ReviewComponent
    ]
  })
export class SharedModule { }
