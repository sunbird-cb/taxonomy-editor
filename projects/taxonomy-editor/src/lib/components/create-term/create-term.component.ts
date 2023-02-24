import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FrameworkService } from '../../services/framework.service';
import {startWith, map} from 'rxjs/operators';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'lib-create-term',
  templateUrl: './create-term.component.html',
  styleUrls: ['./create-term.component.scss']
})

export class CreateTermComponent implements OnInit {
  name:string = ''
  termLists: any = []
  filtedTermLists: Observable<any[]>;
  createTermForm: FormGroup 
  disableCreate = false
  isTermExist = false
   constructor(
    public dialogRef: MatDialogRef<CreateTermComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private frameWorkService: FrameworkService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    const requestBody = {
      request: {
        search: {
            status: "Draft"
        }
    }
    } 
    this.frameWorkService.readTerms(this.data.frameworkId, this.data.categoryId, requestBody).subscribe(data => {
       this.termLists = data.terms
    })
   
    this.initTermForm()
  }

  initTermForm(){
    this.createTermForm = this.fb.group({
      name:['', [Validators.required]],
      description:['']
    })
    this.filtedTermLists =  this.createTermForm.get('name').valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(searchTxt: any): string[] {
    let isExist;
    this.disableCreate = false
    this.isTermExist = false
    this.createTermForm.get('description').enable()
    this.createTermForm.get('description').patchValue('')
    const filterValue = typeof(searchTxt)==='object'? this._normalizeValue(searchTxt.name):this._normalizeValue(searchTxt);
    isExist = this.termLists.filter(term => this._normalizeValue(term.name).includes(filterValue));
    return isExist
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

 onSelect(term){
    this.createTermForm.get('name').patchValue(term.value.name)
    this.createTermForm.get('description').patchValue(term.value.description)
    this.createTermForm.get('description').disable()
    this.disableCreate = true
 }

 saveTerm(){
  if(this._filter(this.createTermForm.value.name).length>0){
    this.isTermExist = true
    console.log('Already exist')
    return
  }
      if(this.createTermForm.valid){
        const requestBody =  {
          request: {
            term: {
              code:this.frameWorkService.getUuid(),
              name:this.createTermForm.value.name,
              description:this.createTermForm.value.description,
              category:this.data.name,
              status:'Draft',
              parents:[
                {identifier:`${this.data.frameworkId}_${this.data.categoryId}`}
              ],
              additionalProperties:{}
            }
          }
        }
        this.frameWorkService.createTerm(this.data.frameworkId, this.data.categoryId, requestBody).subscribe(data => {
          console.log(data);
          this.dialogClose()
        })
      }
  }

  

dialogClose(){
  this.dialogRef.close()
}

}
