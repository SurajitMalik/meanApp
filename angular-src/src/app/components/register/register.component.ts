import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router'

import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;

  constructor(
    private validate: ValidateService,
    private flashMessage: FlashMessagesService,
    private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
  }

  onRegister() {
    const user = {
      name: this.firstName + ' ' + this.lastName,
      username: this.userName,
      email: this.email,
      password: this.password
    }

    console.log('Requested body @onRegister() -----> ', user)

    // Check Required Fields
    if (!this.validate.validateRegister(user)) {
      this.flashMessage.show('Please fill in all the required fields!', { cssClass: 'alert-danger', timeout: 3000 });
      console.log('Please fill in all the required fields!');
      return;
    }

    // Check Email
    else if (!this.validate.validateEmail(user.email)) {
      this.flashMessage.show('Please input a proper email address!', { cssClass: 'alert-danger', timeout: 3000 });
      console.log('Please input a proper email address!');
      return;
    }

    // Register
    this.auth.register(user)
      .subscribe(response => {
        console.log('Response @register() ------>', response)
        const data = response.json();
        if (data.success) {
          this.flashMessage.show('You are now registered and can log in!', { cssClass: 'alert-success', timeout: 3000 });
          this.router.navigate(['/login']);
        } else {
          this.flashMessage.show(response.statusText, { cssClass: 'alert-danger', timeout: 3000 });
          this.router.navigate(['/register']);
        }
      })
  }

}
