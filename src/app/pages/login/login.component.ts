import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IRequestLogin } from 'src/app/shared/models/IRequestLogin';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide: boolean = true;
  formulario: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private accountService: AccountService,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar
  ) { }
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      savePassword: [true]
    });
  }

  public openRegister() {
    this.router.navigate(['register'])
  }

  public openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  public onSubmit() {
    const valuesToSend: IRequestLogin = {
      username: this.formulario.value.username,
      password: this.formulario.value.password
    }
    this.accountService.login(valuesToSend).subscribe(
      (values: any) => {
        window.localStorage.setItem('token', values.token)
        this.router.navigate([''])
      },
      () => {
        this.openSnackBar("Usuário ou senha incorretos","Dispensar");
        this.formulario.controls['username'].setErrors({'incorrect': true})
        this.formulario.controls['password'].setErrors({'incorrect': true})
      }
    )
  }

}
