import {ChangeDetectionStrategy, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {disabledBut} from '../../shared/helpers/functions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  form: FormGroup;
  errorText: string;
  isSendReq = {send: false};

  constructor(private usersService: UsersService,
              private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)])
    });
  }

  ngOnDestroy() {}

  comeIn(): void {
    disabledBut(this.isSendReq);
    this.usersService.getUserByEmail(this.form.value.email)
      .pipe(untilDestroyed(this))
      .subscribe((user) => {
        if (user[0]) {
          if (user[0].password === this.form.value.password) {
            this.errorText = '';
            this.authService.login(user[0]['id']);
          } else {
            this.errorText = 'Password invalid';
          }
        } else {
          this.errorText = 'User do not exist';
        }
      });
  }

}
