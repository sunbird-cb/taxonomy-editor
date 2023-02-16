import { TestBed } from '@angular/core/testing';

import { TaxonomyEditorService } from './taxonomy-editor.service';

describe('TaxonomyEditorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TaxonomyEditorService = TestBed.get(TaxonomyEditorService);
    expect(service).toBeTruthy();
  });
});
