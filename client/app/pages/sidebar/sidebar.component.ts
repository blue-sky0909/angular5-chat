import { Component, OnInit } from '@angular/core';
import { DataSource } from '@angular/cdk/collections';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { ToastComponent } from '../../shared/toast/toast.component';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { User } from '../../shared/models/user.model';

@Component({
  selector: 'app-side-bar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

export class SideBarComponent implements OnInit {

  users: User[] = [];
  isLoading = true;
  public selectedUser: any;

  constructor(
    public auth: AuthService,
    public toast: ToastComponent,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
    this.userService.getUsers().subscribe(
      data => {
        this.users = data;
      },
      error => console.log(error),
      () => this.isLoading = false
    );
  }

  selectUser(user) {
    console.log(user)
    this.selectedUser = user;
  }
}

