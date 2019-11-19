import {Component, NgZone} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private authService: AuthenticationService, private router: Router,
              private ngZone: NgZone) {

  }
  title = 'CDP';

  public logout() {
    this.authService.logout();
    this.ngZone.run(() => this.router.navigate(['login']));
  }
}
