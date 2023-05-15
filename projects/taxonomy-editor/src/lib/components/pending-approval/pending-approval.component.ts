import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApprovalService } from '../../services/approval.service';
import * as API from '../../constants/app-constant';
import { FrameworkService } from '../../services/framework.service';
import * as IApp from '../../models/approval.model';
import { labels } from '../../labels/strings';

@Component({
  selector: 'lib-pending-approval',
  templateUrl: './pending-approval.component.html',
  styleUrls: ['./pending-approval.component.scss']
})
export class PendingApprovalComponent implements OnInit {
  pendingList = [];
  approvalList = [];
  categories = [];
  app_strings: any = labels;
  constructor(private approvalService: ApprovalService, private frameworkService: FrameworkService) { }

  ngOnInit() {
      this.getApprovalList()
      this.frameworkService.getFrameworkInfo().subscribe(res => {
        this.categories = res.result.framework.categories.map(d => d.code)
      })
  }

  getApprovalList() {
    const payload: IApp.IApproval = { applicationStatus:API.APPROVAL.LEVEL1, serviceName:API.APPROVAL.SERVICE_NAME }
    this.approvalService.getApprovalList(payload).subscribe((res:any) => {
       this.approvalList = res.result.data
    })
  }

  removeDuplicates(arr) {
    return [...new Set(arr)];
  }

  createApprovalList(updateFieldValues){
    let updateFileds = []
    let categories = []
    let approvalList = []
    updateFileds = JSON.parse(updateFieldValues);
    categories =  updateFileds.map(fd => fd.category)
    categories =  this.removeDuplicates(categories)
    categories.forEach((c) => {
      let temp = {name:'', terms:[], children: []}
      temp.name = c,
      temp.children = updateFileds.filter(term => term.category === c)
      approvalList.push(temp)
      })
      return approvalList
  }

  getTerms(terms: any){
      const temp = terms.map(t => t.name);
      const t = temp.shift()
      return temp
  }

}
