import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IConsulta } from 'src/app/shared/models/IConsulta';
import { IConsultaTable } from 'src/app/shared/models/IConsultaTable';
import { AccountService } from 'src/app/shared/services/account.service';
import { ConsultasService } from 'src/app/shared/services/consultas.service';

@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent implements OnInit {

  public consultasMarcadas: IConsultaTable[] = [];

  displayedColumns: string[] = ['especialidade', 'profissional', 'data', 'hora', 'action'];

  constructor(
    private accountService: AccountService,
    private consultasService: ConsultasService,
    private router: Router,
    private _snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.consultasService.getConsultasAgendadas().subscribe(
      (values: IConsulta[]) => {
        this.consultasMarcadas = this.consultasToTableData(values);
      }
    );
  }

  public novaConsulta() {
    console.log('Criar consulta');
  }

  public logout() {
    this._snackBar.open("Desconectado", "Dispensar");
    this.accountService.logout();
    this.router.navigate(['login']);
  }

  public desmarcarConsulta(id: number) {
    console.log('Desmarcar consulta: ', id);
    
  }

  private consultasToTableData(values: IConsulta[]): IConsultaTable[] {
    return values.map(element => ({
      id: element.id,
      especialidade: element.medico.especialidade.nome,
      profissional: element.medico.nome,
      data: element.dia,
      hora: element.horario
    }))
  }
}
