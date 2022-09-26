import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GuardsModule } from './guards/guards.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    GuardsModule
  ]
})
export class CoreModule { }
