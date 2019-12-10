import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef, MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {User} from '../../../models/user';
import {AuthenticationService} from '../../../services/authentication.service';
import {UserService} from '../../../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupForm: FormGroup;
  errorMessage: string;
  dialogRef: MatDialogRef<SignupComponent>;
  configSnackBar = new MatSnackBarConfig();
  public constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private ngZone: NgZone,
    public snackBar: MatSnackBar,
    private formBuilder: FormBuilder
  ) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4) ]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  public submitSignupForm() {
    if (this.signupForm.invalid) {
      return;
    }
    const username = this.signupForm.controls.username.value;
    const email = this.signupForm.controls.email.value;
    const password = this.signupForm.controls.password.value;
    const newUser = new User(null, username, email, password);
    console.log(newUser);
    this.userService.addUser(newUser).subscribe(res => {
      console.log(res);
      this.authenticationService.setToken(res.token);
      this.authenticationService.setUsername(res.username);
      this.authenticationService.setIdUser(res.id);
      this.authenticationService.setEmail(res.email);
      this.ngZone.run(() => this.router.navigate(['home']));
    },
      error => {
          console.log(error);
          if (error.error.errors.email !== undefined) {
            this.snackBar.open('❌ ' + 'Email existe déja ', 'Fermer', this.configSnackBar);
          } else {
            this.snackBar.open('❌ ' + 'Erreur lors d\'inscription  ', 'Fermer', this.configSnackBar);
          }


      });
  }

  signIn() {
    this.router.navigate(['login']);
  }

}
