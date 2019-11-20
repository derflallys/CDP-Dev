import {Component, NgZone, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
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

  public constructor(
    private userService: UserService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private ngZone: NgZone,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.signupForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
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
      this.ngZone.run(() => this.router.navigate(['projects']));
    });
  }

  signIn() {
    this.router.navigate(['login']);
  }

}
