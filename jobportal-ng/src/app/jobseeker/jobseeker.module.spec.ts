import { JobseekerModule } from './jobseeker.module';

describe('JobseekerModule', () => {
  let jobseekerModule: JobseekerModule;

  beforeEach(() => {
    jobseekerModule = new JobseekerModule();
  });

  it('should create an instance', () => {
    expect(jobseekerModule).toBeTruthy();
  });
});
