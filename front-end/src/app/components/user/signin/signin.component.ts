import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material';
import {Router} from '@angular/router';
import {UserService} from '../../../services/user.service';
import {User} from '../../../models/user';
import {AuthenticationService} from '../../../services/authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  signinForm: FormGroup;
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

  public ngOnInit(): void {
    /*if (this.authenticationService.getToken() !== null) {
      this.ngZone.run(() => this.router.navigate(['projects']));
    }*/
    this.signinForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  public submitSigninForm() {
    if (this.signinForm.invalid) {
      return;
    }
    const email = this.signinForm.controls.email.value;
    const password = this.signinForm.controls.password.value;
    const newUser =  new User(null, null, email, password);
    this.userService.connect(newUser).subscribe(res => {
      this.authenticationService.setToken(res.token);
      this.authenticationService.setUsername(res.username);
      this.authenticationService.setIdUser(res.id);
      this.authenticationService.setEmail(res.email);
      this.ngZone.run(() => this.router.navigate(['home']));
    },
      error => {
        console.log(error);
        this.snackBar.open('❌ ' + error.error.message, 'Fermer', this.configSnackBar);
      }
    );
  }

  signUp() {
    this.router.navigate(['signup']);
  }

}
