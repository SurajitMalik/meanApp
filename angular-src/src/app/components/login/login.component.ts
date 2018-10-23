import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { AuthService } from '../../services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public username: string;
  public password: string;

  constructor(
    private router: Router,
    private flashMessage: FlashMessagesService,
    private auth: AuthService
  ) { }

  ngOnInit() {
  }

  onLogin() {
    const user = {
      username: this.username,
      password: this.password
    }
    console.log('Requested body @onLogin() -----> ', user);

    this.auth.authenticate(user)
      .subscribe(response => {
        console.log('Response @onLogin() -----> ', response);
        const data = response.json();
        if (data.success) {
          this.auth.storeUserData(data.token, data.user);
          this.router.navigate(['/dashboard']);
          this.flashMessage.show('You are successfully logged in!', { cssClass: 'alert-success', timeout: 3000 })
        } else {
          this.flashMessage.show(data.msg, { cssClass: 'alert-danger', timeout: 3000 })
        }
      })
  }

}
