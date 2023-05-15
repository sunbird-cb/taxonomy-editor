import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { LocalConnectionService } from '../../services/local-connection.service';
import { FrameworkService } from '../../services/framework.service';
import { IConnectionType } from '../../models/connection-type.model';
import { labels } from '../../labels/strings';


@Component({
  selector: 'lib-connector',
  templateUrl: './connector.component.html',
  styleUrls: ['./connector.component.scss']
})

export class ConnectorComponent implements OnInit {
  connectorForm: FormGroup;
  app_strings: any = labels;
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
      endpoint: [this.localScv.localStorage.data.endpoint,
      [Validators.required,
      Validators.pattern(/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/)]],
      token: [this.localScv.localStorage.data.token, [Validators.nullValidator]],
      frameworkName: [this.localScv.localStorage.data.frameworkName, [Validators.required]],
    })
  }
  saveConnection() {
    if (this.connectorForm.valid) {
      this.dialogRef.close({ source: 'online', data: this.connectorForm.value } as IConnectionType)
    }
  }
  clear() {
    this.connectorForm.reset()
    this.dialogRef.close({ source: 'online', data: {} } as IConnectionType)
  }
  dialogClose() {
    this.dialogRef.close({ source: 'online', data: {} } as IConnectionType)
  }
  loadDefault() {
    this.dialogRef.close({ source: 'offline', data: {}} as IConnectionType)
  }

}
