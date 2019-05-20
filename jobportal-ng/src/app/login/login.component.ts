import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  seeker = true;
  role = 'Seeker';
  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  });

  registerForm = new FormGroup({
    username: new FormControl(''),
    firstname: new FormControl(''),
    lastname: new FormControl(''),
    password: new FormControl('')
  });

  constructor(private router: Router, private authService: AuthService) {

  }

  ngOnInit() {
  }

  login() {
    console.log(this.loginForm.value);
    this.authService.logIn(this.loginForm.value, this.seeker).subscribe(res => {
      console.log(res);
      this.authService.id = res.id;
      this.authService.sendFirstname(res.firstname);
      this.authService.sendLastname(res.lastname);
      if (this.seeker) {
        this.authService.sendRole('seeker');
      } else {
        this.authService.sendRole('provider');
      }
      console.log(res);
      this.router.navigate(['/home']);
    });
  }

  register() {
    console.log(this.registerForm.value);
    if (this.seeker) {
      this.authService.postCandidate(this.registerForm.value).subscribe((res) => {
        console.log(res);
        this.authService.sendRole('seeker');
        this.router.navigate(['/' + res.id + '/seeker/complete_profile']);
      });
    } else {
      this.authService.postRecruiter(this.registerForm.value).subscribe((res) => {
        console.log(res);
        this.authService.sendRole('provider');
        this.router.navigate(['/' + res.id + '/provider/complete_profile']);
      });
    }
  }

  status() {
    this.seeker = !this.seeker;
    console.log(this.seeker);
    if (this.seeker) {
      this.role = 'Seeker';
    } else {
      this.role = 'Recruiter';
    }
  }

}
