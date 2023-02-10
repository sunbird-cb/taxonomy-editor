import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateCategoriesComponent } from '../../components/create-categories/create-categories.component';

import { ConfigFrameworkComponent } from './config-framework.component';
import { AngularMaterialModule } from '../../angular-material-module';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FrameworkService } from '../../services/framework.service';

describe('ConfigFrameworkComponent', () => {
  let component: ConfigFrameworkComponent;
  let fixture: ComponentFixture<ConfigFrameworkComponent>;
  let frameworkService: FrameworkService
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConfigFrameworkComponent, CreateCategoriesComponent ],

      imports: [BrowserModule, BrowserAnimationsModule, AngularMaterialModule, ReactiveFormsModule],
      providers:[FrameworkService]
    })
    .compileComponents();
    
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfigFrameworkComponent);
    component = fixture.componentInstance;
    frameworkService =  new FrameworkService()
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call framework service to get framework data', () => {
    component.ngOnInit()
    expect(component.frameworkCategories.length).not.toBe(0);
  });


});
