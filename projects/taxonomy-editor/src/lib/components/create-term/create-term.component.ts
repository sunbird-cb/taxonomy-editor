import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'lib-create-term',
  templateUrl: './create-term.component.html',
  styleUrls: ['./create-term.component.scss']
})
export class CreateTermComponent implements OnInit {
  name:string = ''
  constructor(
    public dialogRef: MatDialogRef<CreateTermComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit() {
  }

  saveTerm(){
    if(this.name){
      console.log(this.name)
      this.dialogClose()
    }

  }

  dialogClose(){
    this.dialogRef.close()
  }

}
