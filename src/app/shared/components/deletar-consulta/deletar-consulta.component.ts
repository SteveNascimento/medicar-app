import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ConsultasService } from '../../services/consultas.service';

@Component({
  selector: 'app-deletar-consulta',
  templateUrl: './deletar-consulta.component.html',
  styleUrls: ['./deletar-consulta.component.css']
})
export class DeletarConsultaComponent implements OnInit {

  constructor(
    private consultaService: ConsultasService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) private data: {consulta_id: number}
  ) { }

  ngOnInit(): void {
  }

  public deletarConsulta() {
    this.consultaService.deleteConsulta(this.data.consulta_id).subscribe({
      next: () => {
        this._snackBar.open("Consulta desmarcada com sucesso!", "Dispensar");
      }
    })
  }

}
