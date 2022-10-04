import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IAgenda } from '../../../core/models/IAgenda';
import { IAgendaHoras } from '../../../core/models/IAgendaHoras';
import { IEspecialidade } from '../../../core/models/IEspecialidade';
import { IMedico } from '../../../core/models/IMedico';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-nova-consulta',
  templateUrl: './nova-consulta.component.html',
  styleUrls: ['./nova-consulta.component.css']
})
export class NovaConsultaComponent implements OnInit {

  public especialidades: IEspecialidade[] = [];
  public medicos: IMedico[] = [];
  public agendas: IAgenda[] = [];
  public horas: IAgendaHoras[] = [];
  formulario: FormGroup = new FormGroup({});

  constructor(
    private consultasService: ConsultasService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      especialidade: ['', Validators.required],
      medicos: [{value: '', disabled: true}, Validators.required],
      dia: [{value: '', disabled: true}, Validators.required],
      hora: [{value: '', disabled: true}, Validators.required],
    });
    this.onChanges();
    this.consultasService.getEspecialidades().subscribe({
      next: (values) => {
        this.especialidades = values;
      }
    });
  }

  public onSubmit(): void {
    this.consultasService.marcarConsulta({
      agenda_id: this.formulario.value.dia.id,
      horario: this.formulario.value.hora
    }).subscribe({
      next: () => {
        this._snackBar.open("Consulta marcada com sucesso!", "Dispensar");
      }
    })
  }

  private onChanges(): void {
    this.formulario.get('especialidade')?.valueChanges.subscribe((value) => {
      this.consultasService.getMedicos({query: '', especialidade: value}).subscribe({
        next: (values) => {
          this.medicos = values
        }
      });

      if (value != '' && value != undefined) {
        this.formulario.get('medicos')?.enable();
      } else {
        this.formulario.get('medicos')?.disable();
      }
      this.formulario.get('medicos')?.setValue('');
    });

    this.formulario.get('medicos')?.valueChanges.subscribe((value) => {
      this.consultasService.getAgendas({especialidade: this.formulario.value.especialidade, medico: value}).subscribe({
        next: (values) => {
          this.agendas = values.map(value => {
            return({
              ...value,
              dia: new Date(value.dia).toLocaleDateString()
            })
          });
        }
      });
      if (value != '' && value != undefined) {
        this.formulario.get('dia')?.enable();
      } else {
        this.formulario.get('dia')?.disable();
      }
      this.formulario.get('dia')?.setValue('');
    });

    this.formulario.get('dia')?.valueChanges.subscribe((value) => {
      const agendaSelecionada = this.agendas.find(agenda => agenda.id === value);
      if (agendaSelecionada) {
        this.horas = agendaSelecionada.horarios;
      }
      if (value != '' && value != undefined) {
        this.formulario.get('hora')?.enable();
      } else {
        this.formulario.get('hora')?.disable();
      }
      this.formulario.get('hora')?.setValue('');
    });
  }
  
}
