import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AccountService } from 'src/app/shared/services/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public hide: boolean = true;
  formulario: FormGroup = new FormGroup({});

  constructor(private router: Router, private accountService: AccountService, private formBuilder: FormBuilder) { }
  
  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public openRegister() {
    this.router.navigate(['register'])
  }

  async onSubmit() {
    try {
      this.accountService.login(this.formulario.value).subscribe(
        (values: any) => {
          window.localStorage.setItem('token', values.token)
          this.router.navigate([''])
        },
        () => {
          this.formulario.controls['username'].setErrors({'incorrect': true})
          this.formulario.controls['password'].setErrors({'incorrect': true})
        }
      )
      
      //this.router.navigate(['']);
    } catch (error) {
      console.log('entrei aq');
    }
    
  }

}
