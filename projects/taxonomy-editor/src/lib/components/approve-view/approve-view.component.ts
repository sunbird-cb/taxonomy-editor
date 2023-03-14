import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'

@Component({
  selector: 'lib-approve-view',
  templateUrl: './approve-view.component.html',
  styleUrls: ['./approve-view.component.scss']
})
export class ApproveViewComponent implements OnInit {
  list$: Observable<object>;
  listItems: any = []
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
      this.list$ = this.activatedRoute.paramMap
      .pipe(map(() => window.history.state.approvalList))

      this.list$.subscribe(res => {
            console.log(res)
            this.listItems = res;
      })
  }

}
