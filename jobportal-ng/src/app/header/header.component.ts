import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isAuthenticated: Boolean =  false;
  id: string = undefined;
  username = undefined;
  firstname = undefined;
  lastname = undefined;
  role = 'seeker';

  constructor(private authService: AuthService) {
    this.authService.loadUserCredentials();
    authService.getLoggedIn().subscribe(res => {
      this.isAuthenticated = res;
      console.log(this.isAuthenticated);
      this.authService.getUsername().subscribe(username => {
        this.username = username;
      });
    });

    authService.getId().subscribe(res => {
      this.id = res;
      console.log(this.id);
      authService.getRole().subscribe(role => {
        console.log(role);
        this.role = role;
      });
    });


  }

  ngOnInit() {
    this.authService.loadUserCredentials();
    this.authService.getUsername().subscribe(username => {
      this.username = username;
    });
  }

  logout() {
    this.authService.logOut();
  }
}
