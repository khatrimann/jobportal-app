export class Job {
  title: string;
  experience: number;
  skills: string[];
  salary: {
    min: number;
    max: number;
  };
  location: string;
  company: string;
}
