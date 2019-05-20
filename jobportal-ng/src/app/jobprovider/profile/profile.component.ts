import { JobService } from './../../services/job.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  id = undefined;
  firstname = undefined;
  lastname = undefined;
  fullname = undefined;
  job: any;


  postJobForm = new FormGroup({
    title: new FormControl(''),
    skills: new FormControl(''),
    experience: new FormControl(''),
    salary: new FormGroup({
      min: new FormControl(''),
      max: new FormControl('')
    }),
    location: new FormControl(''),
    company: new FormControl
  });

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService, private jobService: JobService) {

    this.route.paramMap.subscribe(params => {
      let id = params.get('id');
      this.id = id;
      console.log(this.id);
      userService.getRecruiter(this.id).subscribe(res => {
        this.job = res;
        this.postJobForm.patchValue({
          company: res.company
        });
        console.log(res);
      });
    });

    this.firstname = authService.fname;
      this.lastname = authService.lname;
      this.fullname = this.firstname + ' ' + this.lastname;
  }

  ngOnInit() {
  }

  postJob() {
    this.jobService.postJob(this.id, this.postJobForm.value).subscribe(res => {
      console.log(res);
    });
  }

  range(n: number): any[] {
    return Array(n);
  }
}
