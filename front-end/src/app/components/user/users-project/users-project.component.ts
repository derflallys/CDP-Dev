import {Component, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatDialogConfig, MatPaginator, MatSnackBar, MatSnackBarConfig, MatSort, MatTableDataSource} from '@angular/material';
import {User} from '../../../models/user';
import {UserService} from '../../../services/user.service';
import { ProjectService } from '../../../services/project.service';
import {AuthenticationService} from '../../../services/authentication.service';
import {Location} from '@angular/common';
import {DeleteDialogComponent} from '../../utils/delete-dialog/delete-dialog.component';
import {ActivatedRoute} from '@angular/router';
import {AddUserComponent} from '../../project/add-user/add-user.component';
import { Project } from '../../../models/project';

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
  index;
  nbUserProject: number;
  projectId ;
  project: Project;
  displayedColumns: string[] = [ 'username', 'role', 'email', 'Actions'];
  role: any;

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
    this.projectService.getProject(this.projectId).subscribe(res => {
      this.project = res;
      this.getRoleUserProject();

    });
  }

  getRoleUserProject() {
    const userCo = this.project.users.find(user => user.user === this.authenticationService.getIdUser());
    if (userCo) {
      this.role = userCo.role;
    }
  }

  applyFilter(filterValue: string) {
    this.users.filter = filterValue.trim().toLowerCase();
    if (this.users.paginator) {
      this.users.paginator.firstPage();
    }
  }

  deleteUserProject(userId, username) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
      title: 'Suppression du collaborateur "' + username + '"',
      content: 'Êtes-vous sûr de vouloir supprimer ce collaborateur ? '
    };
    this.snackBar.open('⌛ Suppression en cours...', 'Fermer', this.configSnackBar);
    const dialogRefDelete = this.dialog.open(DeleteDialogComponent, dialogConfig);

    dialogRefDelete.afterClosed().subscribe(result => {
      if (result === true) {
        const role = this.role;
        const user = this.project.users.find( users => users.user === userId && users.user !== this.authenticationService.getIdUser());
        this.index = this.project.users.findIndex( users => users.user === userId );
        this.project.users.splice(this.index, 1);
        this.projectService.updateProject(this.project, this.projectId).subscribe(() => {
            this.snackBar.open('✅ Suppression effectuée avec succès !', 'Fermer', this.configSnackBar);
            this.refreshUsers();
          },
          error => {
            console.log(error);
            this.snackBar.open('❌ Une erreur s\'est produite lors de la suppression !', 'Fermer', this.configSnackBar);
          }
        );
      }
    });
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
