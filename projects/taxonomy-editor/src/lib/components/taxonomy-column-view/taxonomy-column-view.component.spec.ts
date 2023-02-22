import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyColumnViewComponent } from './taxonomy-column-view.component';

describe('TaxonomyColumnViewComponent', () => {
  let component: TaxonomyColumnViewComponent;
  let fixture: ComponentFixture<TaxonomyColumnViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomyColumnViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyColumnViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
