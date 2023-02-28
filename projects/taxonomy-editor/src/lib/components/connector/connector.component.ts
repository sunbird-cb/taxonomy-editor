import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalConnectionService } from '../../services/local-connection.service';
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
    private localScv: LocalConnectionService,
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
      endpoint: [this.localScv.localStorage.endpoint, [Validators.required]],
      token: [this.localScv.localStorage.token, [Validators.required]],
    })
  }
  saveConnection() {
    if (this.connectorForm.valid) {
      this.dialogRef.close(this.connectorForm.value)
    }
  }
  clear(){
    this.connectorForm.reset()
    this.dialogRef.close(this.connectorForm.value)
  }
  dialogClose() {
    this.dialogRef.close(null)
  }

}
