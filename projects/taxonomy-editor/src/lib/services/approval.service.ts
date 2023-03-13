import { Injectable } from '@angular/core';
import { FrameworkService } from '../services/framework.service'
import * as API from '../constants/api-list'
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ApprovalService {
  environment
  constructor(private frameworkService: FrameworkService, private http: HttpClient) { 
    this.environment = this.frameworkService.getEnviroment()
  }

  createApproval(req){
    req.state = API.APPROVAL.STATE
    req.action = API.APPROVAL.ACTION
    req.serviceName = API.APPROVAL.SERVICE_NAME
    console.log(req)
     return this.http.post(`${API.APPROVAL.CREATE}`,req)
  }

  getApprovalList(req){
    return this.http.post(`${API.APPROVAL.SEARCH}`,req)
  }
}
