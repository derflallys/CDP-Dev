import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  signinForm: FormGroup;
  dialogRef: MatDialogRef<SigninComponent>;
  public userConnected: boolean;

  public constructor(private httpClient: HttpClient, private router: Router) { }

  public ngOnInit(): void {
    this.signinForm = new FormGroup({
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
    this.userConnected = JSON.parse(sessionStorage.getItem('isConnected'));
  }

  public get email() {
    return this.signinForm.get('email');
  }

  public get password() {
    return this.signinForm.get('password');
  }

  public submitSigninForm() {
    if (this.signinForm.valid) {
      this.httpClient.post(
        '/api/signin',
        this.signinForm.value, {
          responseType: 'json'
        }).subscribe(() => {
        sessionStorage.setItem('email', this.signinForm.value.email);
        sessionStorage.setItem('isConnected', 'true');
        this.userConnected = true;
        this.router.navigate(['Projects']);
      }, (error) => {
        console.log(error);
      });
    }
  }

  public logout() {
    sessionStorage.setItem('isConnected', 'false');
    this.userConnected = false;
    this.router.navigate(['signup']);
    sessionStorage.setItem('username', null);
  }

}
