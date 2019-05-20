import { HttpClient } from '@angular/common/http';
import { AuthService } from './../services/auth.service';
import { JobService } from './../services/job.service';
import { Job } from './../shared/job';
import { Component, OnInit, ViewChild, Input, AfterViewInit, ElementRef, Renderer2 } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {

  jobs: any;
  searchBar = new FormControl('');
  endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
  skills = ['Java', 'HTML', 'CSS', 'PHP', 'Python'];
  @ViewChild('search') search;
  @ViewChild('suggestions') suggestions;
  cityname: any;
  innerhtml: any;

  constructor(private jobService: JobService, private authService: AuthService, private http: HttpClient, private elemRef: ElementRef, private renderer: Renderer2) {
    console.log('loaded');
    jobService.getJobs().subscribe(res => {
      this.jobs = res;
      console.log(this.jobs);
    });
   }

  ngOnInit() {
    console.log('loaded');
  }

  ngAfterViewInit() {
    console.log(this.search.nativeElement.value);
    // this.elemRef.nativeElement.querySelector('search').addEventListener('change', this.displayMatches);
    // this.elemRef.nativeElement.querySelector('search').addEventListener('keyup', this.displayMatches);
  }

  apply(id: string) {
      this.jobService.applyJob(this.authService.string_id, id).subscribe(res => {
        console.log(res);
      });
    console.log(id);
  }

  // HERE GOES THE CODE FOR SEARCH STARTS

  // const searchInput = document.querySelector('.search');
  // const suggestions = document.querySelector('.suggestions');
  findMatches(wordToMatch, skills) {
    return skills.filter(place => {
      console.log(place);
      const regex = new RegExp(wordToMatch, 'gi');
      console.log(regex);
      return place.match(regex);
    });
  }
  // numberWithCommas(x) {
  //   return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  // }
  displayMatches(event: any) {
    console.log(event);
    const matchArray = this.findMatches(this.search.nativeElement.value, this.skills);
    console.log(this.search.nativeElement.value);
    const html = matchArray.map(place => {
      const regex = new RegExp(this.search.nativeElement.value, 'gi');

      const cityName = place.replace(regex, `<span class="hl">${this.search.nativeElement.value}</span>`);
      // console.log(cityName);
      this.cityname = cityName;
      const li = this.renderer.createElement('li');
      const span = this.renderer.createElement('span');
      const clas = this.renderer.addClass(span, 'name');
      const text = this.renderer.createText(cityName);
      // this.renderer.appendChild(span, text);
      // this.renderer.appendChild(li, span);
      // this.renderer.appendChild(this.suggestions.nativeElement, li);
      this.innerhtml = `<li><span class="name">${cityName}</span></li>`;
      console.log(this.innerhtml);
      return `<li>
      <span class="name">${cityName}</span>
  </li>
`;
    }).join('');
    // suggestions.innerHTML = html;
    // console.log(html);
  }
  // searchInput.addEventListener('change', displayMatches);
  //  searchInput.addEventListener('keyup', displayMatches);

}
