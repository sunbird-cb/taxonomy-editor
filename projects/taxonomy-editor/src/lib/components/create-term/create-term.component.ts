import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FrameworkService } from '../../services/framework.service';
import {startWith, map} from 'rxjs/operators';
import { FormArray, FormControl, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'lib-create-term',
  templateUrl: './create-term.component.html',
  styleUrls: ['./create-term.component.scss']
})

export class CreateTermComponent implements OnInit {
  name:string = ''
  termLists: any = []
  createTermForm: FormGroup 
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
      name:[''],
      description:['']
    })
  }


 onSelect(name){
  console.log(name)
 }

  saveTerm(){
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
