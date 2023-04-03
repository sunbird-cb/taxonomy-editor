import { Pipe, PipeTransform } from '@angular/core';
import { ApprovalService } from '../services/approval.service';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {
  approvalTerms = [];
  constructor(private approvalService: ApprovalService){}

  transform(value): any{
    // return null;
    if(value) {
      return value.slice().reverse();
    } else {
      return null
    }
     
  }

}
