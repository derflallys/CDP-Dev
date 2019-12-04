import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSnackBarConfig, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import { ProjectService } from '../../../services/project.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {Location} from '@angular/common';
import {DeleteDialogComponent} from '../../utils/delete-dialog/delete-dialog.component';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-users-project',
  templateUrl: './users-project.component.html',
  styleUrls: ['./users-project.component.css']
})
export class UsersProjectComponent implements OnInit {


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  users: MatTableDataSource<User> = new MatTableDataSource<User>();
  configSnackBar = new MatSnackBarConfig();

  nbUserProject: number;
  projectId ;
  displayedColumns: string[] = [ 'username', 'role', 'email'];
  idSelectedProject;
  constructor( private userService: UserService,
               private projectService: ProjectService,
               public dialog: MatDialog,
               public activatedRoute: ActivatedRoute,
               public authenticationService: AuthenticationService,
               public projectservice: ProjectService,
               public snackBar: MatSnackBar,
               private location: Location
  ) {
    this.configSnackBar.verticalPosition = 'bottom';
    this.configSnackBar.horizontalPosition = 'center';
    this.configSnackBar.duration = 5000;
  }
  ngOnInit() {
    this.projectId = this.activatedRoute.snapshot.paramMap.get('id');
    this.projectService.getUsersByProject(this.projectId).subscribe(res => {
      this.users = new MatTableDataSource(res);
      this.nbUserProject = res.length;
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
    });
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  deleteUserProject(userId, userName) {
  }

  refreshUsers() {
    this.projectService.getUsersByProject(this.projectId).subscribe(users => {
      this.users = new MatTableDataSource(users);
      this.users.paginator = this.paginator;
      this.users.sort = this.sort;
      this.paginator._changePageSize(this.paginator.pageSize);
      this.nbUserProject = users.length;
    });
  }

  goBack() {
    this.location.back();
  }
}
