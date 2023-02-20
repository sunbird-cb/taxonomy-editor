import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, ViewChild } from '@angular/core';
declare var LeaderLine: any;

@Component({
  selector: 'lib-categories-preview',
  templateUrl: './categories-preview.component.html',
  styleUrls: ['./categories-preview.component.scss']
})
export class CategoriesPreviewComponent implements OnChanges, OnInit { 

  @Input() data
  lineRef = []
  constructor() { }

  ngOnChanges(){
    setTimeout(() => {
          this.drawLine()
    },200)
  }

  ngOnInit() {}
 
  // ngAfterViewInit() {
  //   this.drawLine()
  // }

  drawLine(){
    this.lineRef = []
    for(let cat of this.data){
      for(let term of cat.terms){
        if(term.connected){
         const startEle = document.querySelector(`#${term.domId}`)
          if(term.parent) {
              const endEle = document.querySelector(`#${term.parent}`)
              const line = new LeaderLine(startEle, endEle);
              line.color='#666'
              line.endPlug = 'disc'
              line.startPlug = 'disc'
              this.lineRef.push(line)
          }
        }
      }
    }
  }

}
