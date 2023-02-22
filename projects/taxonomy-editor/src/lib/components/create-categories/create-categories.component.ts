import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, OnInit, Input, Output , EventEmitter} from '@angular/core';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-create-categories',
  templateUrl: './create-categories.component.html',
  styleUrls: ['./create-categories.component.scss']
})
export class CreateCategoriesComponent implements OnInit {
  @Input() taxonomyInfo:any
  @Output() updateCategory = new EventEmitter()
  @Output() removeCategories = new EventEmitter()
  @Output() changePosition = new EventEmitter()

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
    })  
  }  

  addCategory() {  
    this.categories().push(this.newCategories());  
  }  
     
  removeCategory(i:number) {  
    this.categories().removeAt(i);  
    this.removeCategories.emit(i)
  }  

  initCategoryForm(){
    for(var cat of this.taxonomyInfo){
      this.categories().push(
      this.fb.group({
          name:cat.name
        })
      );  
    }
  }

  saveForm() {
    console.log(this.createCategoriesForm.value.categories)
    this.updateCategory.emit(this.createCategoriesForm.value.categories)
  }

  emitCategory(event){
    this.updateCategory.emit(event.target.value)
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.changePosition.emit({cur:event.currentIndex, prev:event.previousIndex})
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
