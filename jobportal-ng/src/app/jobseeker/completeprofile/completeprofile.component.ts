import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-completeprofile',
  templateUrl: './completeprofile.component.html',
  styleUrls: ['./completeprofile.component.css']
})

export class CompleteprofileComponent implements OnInit {

  id = undefined;
  seekerForm = new FormGroup({
    company: new FormArray([]),
    education: new FormArray([]),
    skills: new FormArray([])
  });

  constructor(private router: Router, private route: ActivatedRoute, private authService: AuthService) {
    console.log('loaded');

   }

  ngOnInit() {
    console.log('loaded');
  }

  addCompany() {
    (<FormArray>this.seekerForm.get('company')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        from: new FormControl(null, Validators.required),
        to: new FormControl(null, Validators.required)
      })
    );
  }

  addEducation() {
    (<FormArray>this.seekerForm.get('education')).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        from: new FormControl(null, Validators.required),
        to: new FormControl(null, Validators.required),
        marks: new FormControl(null, Validators.required)
      })
    );
  }

  addSkills() {
    (<FormArray>this.seekerForm.get('skills')).push(
      new FormGroup({
        skill: new FormControl(null, Validators.required),
        level: new FormControl(null, Validators.required),
      })
    );
  }

  proceed() {
    console.log(this.seekerForm.value);
    this.id = this.route.snapshot.params.id;
    console.log(this.id);
    // this.seekerForm.controls['company'].patchValue({
    //   from: new Date(this.seekerForm.controls['company'].get('from').value),
    //   to: new Date(this.seekerForm.controls['company'].get('to').value)
    // });
    // console.log((<FormArray>this.seekerForm.get('company')).value[0]['from'])

      const len = (<FormArray>this.seekerForm.get('company')).length;
      console.log(len);

      for (let i = 0; i < len; i++) {
        console.log((<FormArray>this.seekerForm.get('company')).value[i]['from']);
      }
      var arrayControl = this.seekerForm.get('company') as FormArray;
      var item = arrayControl.at(0);
      console.log(item.get('from'));
      // for (let i = 0; i < len; i++) {
      //   this.seekerForm.controls['company'].patchValue({
      //     from: new Date((<FormArray>this.seekerForm.get('company')).value[i]['from']),
      //     to: new Date((<FormArray>this.seekerForm.get('company')).value[i]['to'])
      //   });
      // }
      // console.log(val);

    console.log(this.seekerForm.value);

    this.authService.postCandidateUpdate(this.id, this.seekerForm.value).subscribe(res => {
     console.log(res);
    });
    // this.router.navigate(['/home']);
  }

  removeCompany(index: number) {
    console.log(index);
    (<FormArray>this.seekerForm.get('company')).removeAt(index);
    let values = this.seekerForm.get('company').value;
     console.log(values);
  }

  removeEducation(index: number) {
    console.log(index);
    (<FormArray>this.seekerForm.get('education')).removeAt(index);
    let values = this.seekerForm.get('education').value;
     console.log(values);
  }
  removeSkill(index: number) {
    console.log(index);
    (<FormArray>this.seekerForm.get('skills')).removeAt(index);
    let values = this.seekerForm.get('skills').value;
     console.log(values);
  }
}
