import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { CategoryForm } from '../../models/category-form.model'
@Component({
  selector: 'lib-config-framework',
  templateUrl: './config-framework.component.html',
  styleUrls: ['./config-framework.component.scss']
})
export class ConfigFrameworkComponent implements OnInit {
  frameworkCategories
  config: CategoryForm[] = [
    {
      type:'text',
      label:'Name',
      name:'name',
      value: 'category',
      placeholder:'Enter your name'
    },
    {
      type:'select',
      label:'Associations',
      name:'associations ',
      value: 'IS',
      placeholder:'Enter Associations',
      options:['CBSE', 'IS', 'SS']
    }
  ]
  dynamicFrameworkCategory
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      this.frameworkCategories = res.result.framework.categories
      this.dynamicFrameworkCategory = [...this.frameworkCategories]
      this.dynamicFrameworkCategory.forEach(ele => {
        ele.type= 'text'
        ele.termType="select",
        ele.value= ele.name
      });
      console.log(this.frameworkCategories)
     
    })
    
  }

}
