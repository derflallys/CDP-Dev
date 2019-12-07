import {Component, NgZone} from '@angular/core';
import {AuthenticationService} from './services/authentication.service';
import {Router} from '@angular/router';
import {StepTaskComponent} from './components/task/step-task/step-task.component';
import {MatDialog, MatSnackBarConfig} from '@angular/material';
import {GuideComponent} from './components/guide/guide.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  configSnackBar = new MatSnackBarConfig();
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    public dialog: MatDialog,
    private ngZone: NgZone
  ) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }

  title = 'CDP';

  public logout() {
    this.authService.logout();
    console.log('After logout');
    this.ngZone.run(() => this.router.navigate(['login']));
  }

  help() {
    this.dialog.open(GuideComponent, {width: '80%', height: '80%'} );
  }
}
