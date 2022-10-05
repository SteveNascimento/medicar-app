import { Injectable } from "@angular/core"
import { MatSnackBar } from "@angular/material/snack-bar"

@Injectable({
    providedIn: 'root'
  })
export class HandleErrors {
    constructor(
        private _snackBar: MatSnackBar
    ){}

    private errors = {
        0: "Problema nos servidores!",
        401: "Usuário ou senha incorretos",
        403: "Acesso negado!",
        404: "Não encontrado!",
        503: "Serviço indisponíveis",
        504: "Erro de conexão!"
    }

    public showMessage(status: 0 | 401 | 403 | 404 | 503 | 504 ): void {
        this._snackBar.open(this.errors[status], "Dispensar")
    }
}