import { TestBed } from '@angular/core/testing';

import { FrameworkService } from './framework.service';

describe('FrameworkService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FrameworkService = TestBed.get(FrameworkService);
    expect(service).toBeTruthy();
  });
});
