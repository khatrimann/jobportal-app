import { UserService } from './../../services/user.service';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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
  user: any;

  constructor(private route: ActivatedRoute, private authService: AuthService, private userService: UserService) {
      // authService.getId().subscribe(id => {
      //   this.id = id;
      //   console.log(this.id);
      // });
      const id = this.route.snapshot.paramMap.get('id');
      console.log(id);
      this.route.paramMap.subscribe(params => {
        let id = params.get('id');
        this.id = id;
        console.log(this.id);
        userService.getCandidate(this.id).subscribe(res => {
          this.user = res;
          console.log(res);
        });
      });


      this.firstname = authService.fname;
      this.lastname = authService.lname;
      this.fullname = this.firstname + ' ' + this.lastname;
  }

  ngOnInit() {

   }

}
