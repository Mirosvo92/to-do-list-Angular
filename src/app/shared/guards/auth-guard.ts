import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs';


@Injectable()
export class AuthGuard implements CanActivate {

  constructor( private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const user = localStorage.getItem('userToDoApp');
    if (user) {
      this.router.navigate(['system']).then();
      return false;
    } else {
      return true;
    }
  }

}
