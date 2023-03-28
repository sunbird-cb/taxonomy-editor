import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'
import { ApprovalService } from '../../services/approval.service';
import { FrameworkService } from '../../services/framework.service';
import * as API from '../../constants/app-constant'
declare var LeaderLine: any;
@Component({
  selector: 'lib-approve-view',
  templateUrl: './approve-view.component.html',
  styleUrls: ['./approve-view.component.scss']
})
export class ApproveViewComponent implements OnInit {
  list$: Observable<object>;
  workflowDetails:any;
  listItems: any = []
  categories: string[] = []
  showAction = true
  lineRef = []
  constructor(private activatedRoute: ActivatedRoute, private approvalService: ApprovalService, private frameworkService: FrameworkService) { }

  ngOnInit() {
      this.list$ = this.activatedRoute.paramMap
      .pipe(map(() => {
        this.getworkFlowDetails(window.history.state.id)
        return  window.history.state.id
      }))
      this.getworkFlowDetails(this.activatedRoute.snapshot.params.id)
  }

  getworkFlowDetails(id) {
      this.approvalService.getWorkflowDetails(id).subscribe((res:any) => {
          this.listItems = res.result.updateFieldValues.map((list:any) => {
            list.selected= false
            return list;
          });
          this.workflowDetails = res.result
          this.approvalService.setApprovalList(this.listItems);
      });
  }

  approvalRequest(){
    const requestBody = {
      wfId:this.activatedRoute.snapshot.params.id,
      state:this.workflowDetails.currentStatus,
      action: API.APPROVAL.APPROVE,
      serviceName:API.APPROVAL.SERVICE_NAME
    }
    this.approvalService.updateWorkFlowApproval(requestBody).subscribe(res => {
      console.log(res)
    });
  }
  closeActionBar(e){
    this.showAction = false;
  }

  /* ***** Don't delete this code might need in Future ***** */
  // drawLine(){
  //   this.lineRef = []
  //   this.categories.forEach((cat, i) => {
  //     this.listItems.forEach((item, j) => {
  //       console.log(item)
  //       if(cat === item.category){
  //         for(let c of item.children){
  //           if(c.category === this.categories[i+1] && this.isExistInTermList(c)){
  //               const line = new LeaderLine(document.getElementById(item.name), document.getElementById(c.name))
  //               line.color='#666'
  //               line.endPlug = 'disc'
  //               line.startPlug = 'disc'
  //               this.lineRef.push(line)
  //           }
           
  //         }
  //       }
  //      })
  //   })
  // }
  // isExistInTermList(term){
  //   const count = this.listItems.filter(item => item.identifier == term.identifier)
  //   return count.length;
  // }
  ngOnDestroy() {
    this.frameworkService.removeOldLine()
  }
}
