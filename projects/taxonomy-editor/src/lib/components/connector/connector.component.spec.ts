import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateTermComponent } from './create-term.component';

describe('CreateTermComponent', () => {
  let component: CreateTermComponent;
  let fixture: ComponentFixture<CreateTermComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateTermComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateTermComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
