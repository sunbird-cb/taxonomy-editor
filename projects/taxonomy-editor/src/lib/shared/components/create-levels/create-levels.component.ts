import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

export interface IcreateLevel {
  label: string,
  type: string
}

@Component({
  selector: 'lib-create-levels',
  templateUrl: './create-levels.component.html',
  styleUrls: ['./create-levels.component.scss']
})
export class CreateLevelsComponent implements OnInit {
  
  createCategoriesForm: FormGroup

  constructor(private fb: FormBuilder) { }

  ngOnInit() { 
   this.createCategoriesForm = this.fb.group({
      categories:this.fb.array([])
    })
    this.addCategory()
  }
  categories(): FormArray {
    return this.createCategoriesForm.get('categories') as FormArray
  }

  newCategories(): FormGroup {  
    return this.fb.group({  
      name:'',  
    })  
  }  

  addCategory() {  
    this.categories().push(this.newCategories());  
  }  
     
  removeCategory(i:number) {  
    this.categories().removeAt(i);  
  }  

  saveForm() {
    console.log(this.createCategoriesForm.value.categories)
  }
}
