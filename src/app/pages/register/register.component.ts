import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IRequestRegister } from 'src/app/core/models/IRequestRegister';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  public hidePassword: boolean = true;
  public hidePasswordConfirm: boolean = true;

  formulario: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private accountService: AccountService,
  ) { }

  public equalsTo(otherField: string){
    const validator = (formControl: FormControl) => {
      if (otherField === null) {
        throw new Error("Você precisa informar um campo!");
      }

      if (!formControl.root || !(<FormGroup>formControl.root).controls) {
        return null;
      }
      
      const field = (<FormGroup>formControl.root).get(otherField)
      
      if (!field) {
        throw new Error("Você precisa informar um campo válido!");
      }

      if (field.value !== formControl.value) {
        return({ 'equalsTo': true})
      }

      return null;
    }
    return validator;
  }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      passwordConfirm: ['', [Validators.required, this.equalsTo('password'), Validators.minLength(8)]]
    });
  }

  public cancel(): void {
    this.router.navigate(['login'])
  }

  public onSubmit() {    
    const formToSend: IRequestRegister = {
      username: this.formulario.value.username,
      email: this.formulario.value.email,
      password: this.formulario.value.password,
    }
    this.accountService.register({...formToSend}).subscribe({
      next: () => {
        this._snackBar.open("Usuário criado com sucesso!", "Dispensar");
        this.router.navigate(['/login'])
      }
    })
  }

}
