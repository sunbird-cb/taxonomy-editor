import { Component, EventEmitter, Input, OnDestroy, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../services/connector.service';

@Component({
  selector: 'lib-taxonomy-column-view',
  templateUrl: './taxonomy-column-view.component.html',
  styleUrls: ['./taxonomy-column-view.component.css']
})
export class TaxonomyColumnViewComponent implements OnInit, OnDestroy {
  @Input() column: any
  @Input() containerId: string
  mapping: any = {}
  columnData = []
  childSubscription: Subscription = null
  constructor(
    private frameworkService: FrameworkService,
    private connectorService: ConnectorService,
  ) {
  }


  ngOnInit(): void {
    this.subscribeEvents()
    if (this.column.index === 1) {
      this.columnData = this.column.children
    }
    this.mapping = this.connectorService.connectorMap
  }

  subscribeEvents() {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
    this.childSubscription = this.frameworkService.currentSelection.subscribe(e => {
      if (!e) {
        return
      } else if (e.type === this.column.code) {
        // set selected
        // this.column.selected = true
        this.setConnectors(e.cardRef, this.columnData, 'SINGLE')
        return
        // console.log("SKIP: from subscription===>", "FOR " + this.category, e)
      } else {
        const next = this.frameworkService.getNextCategory(e.type)
        // console.log("ADD: from subscription===>", "FOR " + this.category, next, this.children)
        if (next && next.code === this.column.code) {
          // console.log('matched===========>', this.column.code)
          this.columnData = (e.data.children || [])
            .filter(x => {
              return x.category == this.column.code
            }).map(mer => {
              /**reset Next level children */
              this.column.children = this.column.children.map(col => { col.selected = false; return col })
              mer.selected = false
              mer.children = ([...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift() || [])
              return mer
            })
          setTimeout(() => {
            this.setConnectors(e.cardRef, next && next.index < this.column.index ? [] : this.columnData, 'ALL')
          }, 100);
          // console.log(this.columnData)
        }
        if (next && next.index < this.column.index) {
          this.columnData = []
        }
      }
    })
  }
  selected(selection: any) {
    // console.log(selection.element.code, selection.isSelected)
    // if(this.column.code==='medium'){
    // console.log( this.column.children)
    // }
    this.column.children = this.column.children.map(col => {
      if (col.code === selection.element.code) {
        col.selected = true
      } else {
        col.selected = false
      }
      return col
    })
  }
  get columnItems() {
    const selected = this.column.children.filter(f => { return f.selected })
    if (selected.length > 0) {
      const data = this.columnData.map(cd => {
        cd.selected = this.column.children.filter(f => { return cd.code === f.code }).map(s => s.selected)[0]
        return cd
      })
      return data
    } else {
      return this.columnData
    }
  }

  setConnectors(elementClicked, columnItem, mode) {
    this.removeConnectors(elementClicked, 'box' + (this.column.index-1))
    console.log('mode', mode)
    console.log('child ', columnItem)
    console.log('elementClicked', elementClicked)
    console.log('mapping', this.mapping)
    if(mode === 'ALL'){
      // let tempmapping = {}
      // this.connectorService.updateConnectorsMap(tempmapping)
      // {
      //   ['column' + (this.column.index- 1)]: ''

      // }
      debugger
      const ids = columnItem.map((c, i) => {
        return this.column.code + 'Card' + (i + 1)
      })
      this.mapping['box' + (this.column.index-1)] = {source: elementClicked, lines: (ids || []).map(id=> {return {target: id, line:'', targetType: 'id'}})}
      this.connectorService.updateConnectorsMap(this.mapping)
      // console.log('next', next)
      const connectionLines = this.connectorService._drawLine(
        this.mapping['box' + (this.column.index-1)].source,
        this.mapping['box' + (this.column.index-1)].lines,
        {startPlug: 'disc', endPlug: 'disc', color: 'black', path: 'grid'},
        '#box'+(this.column.index- 1),
        '#box'+this.column.index
      )
      this.mapping['box' + (this.column.index-1)].lines = connectionLines
      console.log('this.mapping :: ----------------------', this.mapping)
      // if (cat.code === 'board') {
      //   this.connectorService._drawLine('box0card0', this.mapping['board']['box0card0'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
      // } else if (cat.code === 'medium') {
      //   this.connectorService._drawLine('box1card1', this.mapping['medium']['box1card1'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
      // } else if (cat.code === 'gradeLevel') {
      //   this.connectorService._drawLine('box2card7', this.mapping['grade']['box2card7'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
    } else {
      console.log('inside else')
      console.log('this.column', this.column)
      const item = this.column.children.findIndex(c => c.selected) + 1
      if (this.column.index > 1) {
        this.mapping['box' + (this.column.index-1)].lines = [{target: elementClicked, line: '', targetType: 'element'}]
      
        this.connectorService.updateConnectorsMap(this.mapping)
        const connectionLines = this.connectorService._drawLine(
          this.mapping['box' + (this.column.index-1)].source,
          this.mapping['box' + (this.column.index-1)].lines,
          {startPlug: 'disc', endPlug: 'disc', color: 'black', path: 'grid'},
          '#box'+(this.column.index- 1),
          '#box'+this.column.index
        )
        this.mapping['box' + (this.column.index-1)].lines = connectionLines
        console.log('this.mapping :: ----------------------', this.mapping)
      }

    }

  }
  removeConnectors(currentElement, prevCol) {
    console.log('prevCol ------------', prevCol)
    if(this.mapping) {
      for (const key in this.mapping) {
        if(this.mapping[key] && this.mapping[key].lines && this.mapping[key].lines.length > 0) {
          const lines = this.mapping[key].lines
          lines.forEach(async (element, index) => {
            if (element != currentElement && prevCol  == key)
            {
              await element.line.remove();
              lines.splice(index, 1);
            }
          });
        }
      }
    }
  }

  ngOnDestroy(): void {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
  }
}