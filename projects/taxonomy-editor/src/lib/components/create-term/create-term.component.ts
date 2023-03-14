import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FrameworkService } from '../../services/framework.service';
import {startWith, map} from 'rxjs/operators';
import { FormArray, FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs/internal/Observable';
import { Identifiers } from '@angular/compiler';

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
  selectedTerm:any = {}
   constructor(
    public dialogRef: MatDialogRef<CreateTermComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private frameWorkService: FrameworkService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.termLists = this.data.columnInfo.children
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
    // this.createTermForm.get('description').patchValue('')
    const filterValue = typeof(searchTxt)==='object'? this._normalizeValue(searchTxt.name):this._normalizeValue(searchTxt);
    isExist = this.termLists.filter(term => this._normalizeValue(term.name).includes(filterValue));
    return isExist
  }

  private _normalizeValue(value: string): string {
    return value.toLowerCase().replace(/\s/g, '');
  }

 onSelect(term) {
    this.selectedTerm = term.value
    this.createTermForm.get('name').patchValue(term.value.name)
    this.createTermForm.get('description').patchValue(term.value.description)
    this.createTermForm.get('description').disable()
    this.disableCreate = true
 }

 saveTerm() {
      if(this._filter(this.createTermForm.value.name).length>0){
        this.isTermExist = true
        console.log('Already exist')
        return
      }
      if(this.createTermForm.valid) {
        const requestBody =  {
          request: {
            term: {
              code:this.frameWorkService.getUuid(),
              name:this.createTermForm.value.name,
              description:this.createTermForm.value.description,
              category:this.data.columnInfo.code,
              status:'Live',
              approvalStatus:'Draft',
              parents:[
                {identifier:`${this.data.frameworkId}_${this.data.columnInfo.code}`}
              ],
              additionalProperties:{}
            }
          }
        }
        this.frameWorkService.createTerm(this.data.frameworkId, this.data.columnInfo.code, requestBody).subscribe((res:any) => {
          // this.publisheFramework(res.result.node_id[0], true)
          this.selectedTerm['identifier'] = res.result.node_id[0];
          this.updateTerm()
        })
      }
  }

  updateTerm() {
    let associations = []
    this.data.selectedparents.forEach((parent,i) => {
        const temp = parent.element.children ? parent.element.children.filter(child => child.identifier === this.selectedTerm.identifier) : null
        if(temp && !temp.length && i < this.data.colIndex) {
          associations = parent.element.children.map(c => {
              return { identifier:c.identifier }
          })
        }
        associations.push({identifier:this.selectedTerm.identifier})
        const reguestBody = {
            request:{
              term:{
                associations: [
                  ...associations
                ]
              }
            }
        }
        this.frameWorkService.updateTerm(this.data.frameworkId, parent.element.category, parent.element.code, reguestBody).subscribe((res:any) => {
          if( this.data.selectedparents.length - 1  === i){
            this.publisheFramework(res.result.node_id, false)
          }
        })
    })
  }

  dialogClose(id:string, created:boolean){
    if(id){
      this.dialogRef.close({
        name:this.createTermForm.value.name,
        description:this.createTermForm.value.description,
        identifier:id,
        created:created,
        status:'Draft'
      })
    } else {
      this.dialogRef.close()
    }
  }
  publisheFramework(id:string, created:boolean){
      this.frameWorkService.publishFramework().subscribe(res => {
        this.dialogClose(id, created)
      });
  }
}
