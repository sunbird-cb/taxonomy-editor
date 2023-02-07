import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaxonomyEditorComponent } from './taxonomy-editor.component';

describe('TaxonomyEditorComponent', () => {
  let component: TaxonomyEditorComponent;
  let fixture: ComponentFixture<TaxonomyEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaxonomyEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaxonomyEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
