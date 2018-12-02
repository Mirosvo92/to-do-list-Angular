import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UsersService} from '../../shared/services/user.service';
import {AuthService} from '../../shared/services/auth.service';
import {untilDestroyed} from 'ngx-take-until-destroy';
import {User} from '../../shared/models/user.model';
import {disabledBut} from '../../shared/helpers/functions';


@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit, OnDestroy {

  form: FormGroup;
  errorText: string;

  constructor(private usersService: UsersService,
              private authService: AuthService) { }

  ngOnInit() {
    this.form = new FormGroup({
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'name': new FormControl(null, [Validators.required]),
    });
  }

  ngOnDestroy() {}

  createUser(): void {
    const {email, password, name} = this.form.value;
    const user = new User(email, password, name);
    this.usersService.getUserByEmail(user['email'])
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        if (data.length) {
          this.errorText = 'User already exists';
        } else {
          this.errorText = 'Successfully';
          this.usersService.createNewUser(user)
            .subscribe((value) => {
              if (value) {
                this.authService.login(value['id']);
              }
            });
        }
      });

  }

}
