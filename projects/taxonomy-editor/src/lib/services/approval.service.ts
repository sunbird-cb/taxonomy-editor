import { Injectable } from '@angular/core';
import { FrameworkService } from '../services/framework.service'
import * as API from '../constants/app-constant'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  environment
  approvalListSubject: BehaviorSubject<any> = new BehaviorSubject([]);

  constructor(private frameworkService: FrameworkService, private http: HttpClient) { 
    this.environment = this.frameworkService.getEnviroment()
  }

  createApproval(req){
    req.state = API.APPROVAL.INITIATE
    req.action = API.APPROVAL.ACTION
    req.serviceName = API.APPROVAL.SERVICE_NAME
    return this.http.post(`${API.APPROVAL.CREATE}`,req)
  }

  getApprovalList(req){
    return this.http.post(`${API.APPROVAL.SEARCH}`,req)
  }

  getWorkflowDetails(id) {
    return this.http.get(`${API.APPROVAL.READ}/${id}`)
  }

  updateWorkFlowApproval(req){
    return this.http.patch(`${API.APPROVAL.UPDATE}`, req)
  }

  removeDuplicates(arr:string[]):string[] {
    return [...new Set(arr)];
  }

  setApprovalList(list){
    this.approvalListSubject.next(list)
  }
  getUpdateList(){
    return this.approvalListSubject.asObservable()
  }
}
