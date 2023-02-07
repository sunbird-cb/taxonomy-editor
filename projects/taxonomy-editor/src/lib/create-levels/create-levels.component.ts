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
  
  createLevel: FormGroup

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() { 
    this.formBuilder.group({
      name:[]
    })
  }
  saveForm(){
    
  }
}
