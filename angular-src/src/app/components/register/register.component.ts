import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages'

import { ValidateService } from '../../services/validate.service'

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

  constructor(private validate: ValidateService, private flashMessage: FlashMessagesService) { }

  ngOnInit() {
  }

  onSubmit() {
    const user = {
      name: this.firstName + ' ' + this.lastName,
      username: this.userName,
      email: this.email,
      password: this.password
    }

    // Check Required Fields
    if (!this.validate.validateRegister(user)) {
      this.flashMessage.show('Please fill in all the required fields!', { cssClass: 'alert-danger', timeout: 3000 });
      console.log('Please fill in all the required fields!')
    }

    // Check Email
    else if (!this.validate.validateEmail(user.email)) {
      this.flashMessage.show('Please input a proper email address!', { cssClass: 'alert-danger', timeout: 3000 });
      console.log('Please input a proper email address!')
    }
  }

}
