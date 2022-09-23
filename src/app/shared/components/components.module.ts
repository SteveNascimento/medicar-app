import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NovaConsultaComponent } from './nova-consulta/nova-consulta.component';
import { MaterialModule } from '../material/material.module';
import { ConsultasService } from '../services/consultas.service';
import { ReactiveFormsModule } from '@angular/forms';
import { DeletarConsultaComponent } from './deletar-consulta/deletar-consulta.component';


@NgModule({
  declarations: [
    NovaConsultaComponent,
    DeletarConsultaComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    NovaConsultaComponent
  ],
  providers: [
    ConsultasService
  ]
})
export class ComponentsModule { }
