import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../shared/models/user.model';
import {UsersService} from '../../shared/services/user.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {Router} from '@angular/router';
import {AuthService} from '../../shared/services/auth.service';

@Component({
  selector: 'app-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit, OnDestroy {

  userData: User;

  constructor(private usersService: UsersService,
              private authService: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usersService.getInfoAboutUser(this.usersService.id)
      .pipe(untilDestroyed(this))
      .subscribe( (data: User[]) => {
        if (data) {
          this.userData = data[0];
        }
      }, error => {
        console.log('user', error);
      });
  }

  ngOnDestroy() {}

  logOut(): void {
    this.authService.logout();
    this.router.navigate(['auth', 'login']);
  }

}
