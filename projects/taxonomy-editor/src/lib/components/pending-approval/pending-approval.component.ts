import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApprovalService } from '../../services/approval.service';
import * as API from '../../constants/api-list';
@Component({
  selector: 'lib-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.scss']
})
export class PendingApprovalComponent implements OnInit {
  pendingList = []
  approvalList = []
  categories = []
  constructor(private approvalService: ApprovalService) { }

  ngOnInit() {
    this.approvalService.getApprovalList({applicationStatus:API.APPROVAL.LEVEL1, serviceName:API.APPROVAL.SERVICE_NAME}).subscribe((res:any) => {
         this.getListAndCategories(res.result.data);
     })
  }

  getListAndCategories(list){
    let updateFileds = []
    let categories = []
    list.forEach((data,i)=> {
            updateFileds = JSON.parse(data.updateFieldValues);
            categories =  updateFileds.map(fd => fd.category)
            categories =  this.removeDuplicates(categories)
            this.createApprovalList(categories, updateFileds)
    }) 
  }

  removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  createApprovalList(categories, updateFileds){
    categories.forEach((c) => {
      let temp = {name:'', terms:[], children: []}
      temp.name = c,
      temp.children = updateFileds.filter(term => term.category === c)
      this.approvalList.push(temp)
    })
  }
  getTerms(terms: any){
      const temp = terms.map(t => t.name);
      const t = temp.shift()
      return temp
  }

}
