import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
  
})
export class LoginComponent implements OnInit {
  constructor(public authService: AuthService, @Inject(DOCUMENT) private document: Document) {
	  // console.log(this.authService.isLoggedIn());
  }

  githubLogin() {
    this.authService.auth();
  }
  ngOnInit(){
    this.document.body.classList.add('login');
}
}
