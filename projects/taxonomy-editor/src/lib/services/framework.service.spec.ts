import { TestBed } from '@angular/core/testing';

import { FrameworkService } from './framework.service';

describe('FrameworkService', () => {
  let service: FrameworkService
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(
    () => {
      service = TestBed.get(FrameworkService);
    });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch data from', () => {
   service.getFrameworkInfo().subscribe((res) => {
    expect(res.result.framework.categories.length).toBeGreaterThan(0)
   })
  });
});
