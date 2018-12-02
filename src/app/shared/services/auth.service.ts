import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './user.service';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private usersService: UsersService) {

  }

  login(userId: number): void {
    localStorage.setItem('userToDoApp', JSON.stringify(userId));
    this.usersService.id = +localStorage.getItem('userToDoApp');
    this.router.navigate(['system', 'markets']);
  }

  logout(): void {
    localStorage.removeItem('userToDoApp');
    this.router.navigate(['auth', 'login']);
  }

}
