import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable()
export class SystemGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = localStorage.getItem('userToDoApp');
    if (user) {
      return true;
    } else {
      this.router.navigate(['auth', 'login']).then();
      return false;
    }
  }

}
