import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateCategoriesComponent } from './create-categories.component';
import { AngularMaterialModule } from '../../angular-material-module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('CreateCategoriesComponent', () => {
  let component: CreateCategoriesComponent;
  let fixture: ComponentFixture<CreateCategoriesComponent>;
  let data;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoriesComponent ],
      imports:[BrowserAnimationsModule, ReactiveFormsModule, AngularMaterialModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoriesComponent);
    component = fixture.componentInstance;
    data = [
      {
        name: "Board",
        description: "Board",
      },
      {
        name: "Medium",
        description: "Medium",
      },
      {
        name: "Grade",
        description: "Grade",
      }
    ]
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should taxonomyInfo undefined and create new category', () => {
    const addCategorySpy = spyOn(component, 'addCategory').and.callThrough()
    component.ngOnInit()
    expect(component.taxonomyInfo).toBeUndefined();
    expect(addCategorySpy).toHaveBeenCalled()
  });

  it('should taxonomyInfo init the data and render it in the form', () => {
    const initCategorySpy = spyOn(component, 'initCategoryForm').and.callThrough()
    component.taxonomyInfo = data
    component.ngOnInit()
    expect(component.taxonomyInfo).toBeDefined();
    expect(initCategorySpy).toHaveBeenCalled()
  });

  it('should category from the list', () => {
    const removeCategorySpy = spyOn(component, 'removeCategory').and.callThrough()
    component.taxonomyInfo = data
    component.removeCategory(0)
    expect(removeCategorySpy).toHaveBeenCalled()
  });

  it('should Save form', () => {
    const saveFormSpy = spyOn(component, 'saveForm').and.callThrough()
    component.taxonomyInfo = data
    component.saveForm()
    expect(saveFormSpy).toHaveBeenCalled()
    expect(component.createCategoriesForm.valid).toBeTruthy()
  });
});
