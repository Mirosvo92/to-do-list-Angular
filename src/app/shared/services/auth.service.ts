import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {UsersService} from './user.service';

@Injectable()
export class AuthService {

  constructor(private router: Router,
              private usersService: UsersService) {

  }

  login(userId: number): void {
    localStorage.setItem('user', JSON.stringify(userId));
    this.usersService.id = +localStorage.getItem('user');
    this.router.navigate(['system', 'markets']);
  }

  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['auth', 'login']);
  }

}
