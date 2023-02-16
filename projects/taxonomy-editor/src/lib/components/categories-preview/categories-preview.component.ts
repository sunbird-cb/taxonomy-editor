import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
declare var LeaderLine: any;

@Component({
  selector: 'lib-categories-preview',
  templateUrl: './categories-preview.component.html',
  styleUrls: ['./categories-preview.component.scss']
})
export class CategoriesPreviewComponent implements OnInit { 

  @Input() data
  constructor() { }
  ngOnInit() {}
 
  ngAfterViewInit() {
    for(let cat of this.data){
        for(let term of cat.terms){
          if(term.connected){
            const startEle = document.querySelector(`#${term.domId}`)
            const endEle = document.querySelector(`#${term.connectedDomId}`)
            const line = new LeaderLine(startEle, endEle);
            line.color='#666'
            line.endPlug = 'disc'
          }
          
        }
    }
  
  }
}
