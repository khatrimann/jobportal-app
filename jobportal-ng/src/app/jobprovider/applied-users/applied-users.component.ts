import { JobService } from './../../services/job.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-applied-users',
  templateUrl: './applied-users.component.html',
  styleUrls: ['./applied-users.component.css']
})
export class AppliedUsersComponent implements OnInit {

  job_id: string;
  users: any;
  constructor(private route: ActivatedRoute, private jobService: JobService) {
    this.route.paramMap.subscribe(params => {
      console.log(params.get('id'));
      this.job_id = params.get('id');
      jobService.getJob(this.job_id).subscribe(job => {
        console.log(job);
        this.users = job.users_applied;
      });

    });
  }

  ngOnInit() {
  }

}
