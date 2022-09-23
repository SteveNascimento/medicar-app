import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { MaterialModule } from './material/material.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    ComponentsModule,
    MaterialModule,
  ]
})
export class SharedModule { }
