import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;
 dialogRef: MatDialogRef<SignupComponent>;

  public constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required])
    });
  }

  public get username() {
    return this.signupForm.get('username');
  }
  public get email() {
    return this.signupForm.get('email');
  }
  public get password() {
    return this.signupForm.get('password');
  }

  public submitSignupForm() {
    if (this.signupForm.valid) {
      this.httpClient.post(
        '/api/addUser',
        this.signupForm.value, {
          responseType: 'json'
        }).subscribe((response) => { // success
        alert('Inscription fait avec succes\n Vous pouvez se connecter maintenant');
      }, (error) => { // error
        console.log(error);
      });
    } else {
    }
  }



}
