import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IRequestLogin } from 'src/app/core/models/IRequestLogin';
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
    private formBuilder: FormBuilder
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

  public onSubmit() {
    const valuesToSend: IRequestLogin = {
      username: this.formulario.value.username,
      password: this.formulario.value.password
    }
    this.accountService.login(valuesToSend).subscribe({
      next: (values: {token: string}) => {
        this.accountService.setToken(values.token);
        this.router.navigate([''])
      },
      error: () => {
        this.formulario.controls['username'].setErrors({'incorrect': true})
        this.formulario.controls['password'].setErrors({'incorrect': true})
      },
    })
  }

}
