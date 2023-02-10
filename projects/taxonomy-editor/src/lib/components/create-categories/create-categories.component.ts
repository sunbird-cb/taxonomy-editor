import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {
  @Input() taxonomyInfo:any

  createCategoriesForm: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() { 
   this.createCategoriesForm = this.fb.group({
      categories:this.fb.array([])
    })
    if(this.taxonomyInfo){
      this.initCategoryForm()
    } else {
       this.addCategory()
    }
  }
  categories(): FormArray {
    return this.createCategoriesForm.get('categories') as FormArray
  }

  newCategories(): FormGroup {  
    return this.fb.group({  
      name:'',  
      description:''
    })  
  }  

  addCategory() {  
    this.categories().push(this.newCategories());  
  }  
     
  removeCategory(i:number) {  
    this.categories().removeAt(i);  
  }  

  initCategoryForm(){
    for(var cat of this.taxonomyInfo){
      this.categories().push(
      this.fb.group({
          name:cat.name,
          description:cat.description
        })
      );  
    }
   
  }
  saveForm() {
    console.log(this.createCategoriesForm.value.categories)
  }

}
