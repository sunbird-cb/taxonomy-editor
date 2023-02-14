import { Component, Input, OnInit } from '@angular/core'
import { FormBuilder, FormControl, FormGroup } from '@angular/forms'
import { CategoryForm } from '../../models/category-form.model'
@Component({
  selector: 'lib-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.scss']
})
export class DynamicFormComponent implements OnInit {
  @Input() config:any
  createCategoriesForm: FormGroup
  fields = []
 
 
  constructor(private fb: FormBuilder) { }

  ngOnInit() { 
    this.buildForm()
  }

  getFormControlsFields() {
    const formGroupFields = {};
    for (const field of Object.keys(this.config)) {
        const fieldsProps = this.config[field]
        formGroupFields[field] = new FormControl(fieldsProps.value);
        this.fields.push({...fieldsProps, fieldName:field});
    }
    return formGroupFields;
  }

  buildForm() {
    const formGroupFields = this.getFormControlsFields();
    this.createCategoriesForm = new FormGroup(formGroupFields);
  }
  saveForm(){
    console.log(this.createCategoriesForm.value)
  }
}
