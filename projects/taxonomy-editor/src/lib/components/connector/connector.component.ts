import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FrameworkService } from '../../services/framework.service';


@Component({
  selector: 'lib-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss']
})

export class ConnectorComponent implements OnInit {
  connectorForm: FormGroup
  constructor(
    public dialogRef: MatDialogRef<ConnectorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private frameWorkService: FrameworkService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    // const requestBody = {
    //   request: {
    //     search: {
    //         status: "Draft"
    //     }
    // }
    // } 
    // this.frameWorkService.readTerms(this.data.frameworkId, this.data.categoryId, requestBody).subscribe(data => {
    //    this.termLists = data.terms
    // })
    this.initConnectorForm()
  }

  initConnectorForm() {
    this.connectorForm = this.fb.group({
      endpoint: ['', [Validators.required]],
      token: ['', [Validators.required]],
    })
  }
  saveConnection() {

  }
  dialogClose() {
    this.dialogRef.close()
  }

}
