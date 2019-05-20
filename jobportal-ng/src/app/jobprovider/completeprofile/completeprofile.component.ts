import { AuthService } from './../../services/auth.service';
import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.component.html',
  styleUrls: ['./completeprofile.component.css']
})

export class CompleteprofileComponent implements OnInit {

  company = new FormControl('');
  id: string;

  constructor(private authService: AuthService, private route: ActivatedRoute, private router: Router) {
    console.log('loaded');
   }

  ngOnInit() {
  }

  proceed() {
    console.log(this.company.value);
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    this.authService.postRecruiterUpdate(this.id, {'company': this.company.value}).subscribe(res => {
      console.log(res);
      this.router.navigate(['/home']);
    });
  }

}
