import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesPreviewComponent } from './categories-preview.component';

describe('CategoriesPreviewComponent', () => {
  let component: CategoriesPreviewComponent;
  let fixture: ComponentFixture<CategoriesPreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesPreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesPreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
