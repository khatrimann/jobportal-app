import { JobproviderModule } from './jobprovider.module';

describe('JobproviderModule', () => {
  let jobproviderModule: JobproviderModule;

  beforeEach(() => {
    jobproviderModule = new JobproviderModule();
  });

  it('should create an instance', () => {
    expect(jobproviderModule).toBeTruthy();
  });
});
