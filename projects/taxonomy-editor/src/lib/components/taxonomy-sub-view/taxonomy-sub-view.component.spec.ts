import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomySubViewComponent } from './taxonomy-sub-view.component';

describe('TaxonomySubViewComponent', () => {
  let component: TaxonomySubViewComponent;
  let fixture: ComponentFixture<TaxonomySubViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomySubViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomySubViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
