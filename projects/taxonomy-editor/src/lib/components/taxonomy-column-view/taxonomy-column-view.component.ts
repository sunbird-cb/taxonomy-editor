import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { Subscription } from 'rxjs';
import { ConnectorService } from '../../services/connector.service';

@Component({
  selector: 'lib-taxonomy-column-view',
  templateUrl: './taxonomy-column-view.component.html',
  styleUrls: ['./taxonomy-column-view.component.scss']
})
export class TaxonomyColumnViewComponent implements OnInit, OnDestroy, OnChanges {
  @Input() column: any
  @Input() containerId: string
  connectorMapping: any = {}
  @Output() updateTaxonomyTerm = new EventEmitter<{ selectedTerm: any, isSelected: boolean }>(true)
  columnData = []
  childSubscription: Subscription = null
  newTermSubscription: Subscription = null
  constructor(
    private frameworkService: FrameworkService,
    private connectorService: ConnectorService,
  ) {
  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes)
  }


  ngOnInit(): void {
    this.subscribeEvents()
    if (this.column.index === 1) {
      this.columnData = this.column.children
    }
    this.connectorMapping = this.connectorService.connectorMap
    // this.frameworkService.isDataUpdated.subscribe(() => {
    //   this.ngOnInit()
    // })
  }

  subscribeEvents() {
    if (this.childSubscription) {
      this.childSubscription.unsubscribe()
    }
    this.childSubscription = this.frameworkService.currentSelection.subscribe(e => {
      if (!e) {
        return
      } else if (e.type === this.column.code) {
        // debugger
        this.updateTaxonomyTerm.emit({ isSelected: true, selectedTerm: e.data })
        this.columnData = (this.columnData || []).map(item => {
          if (item.code === e.data.code) {
            item.selected = true
          } else {
            item.selected = false
          }
          return item
        })
        this.setConnectors(e.cardRef, this.columnData, 'SINGLE')
        return
        // console.log("SKIP: from subscription===>", "FOR " + this.category, e)
      } else {
        const next = this.frameworkService.getNextCategory(e.type);
        // // console.log("ADD: from subscription===>", "FOR " + this.category, next, this.children)
        if (next && next.code === this.column.code) {
          //   const back = this.frameworkService.getPreviousCategory(this.column.code)
          //   console.log('current Saved ===========>', this.frameworkService.getLocalTermsByCategory(this.column.code))
          //   const localTerms = []
          //   this.frameworkService.getLocalTermsByCategory(this.column.code).forEach(f => {
          // debugger
          //     const lst = back ? this.frameworkService.selectionList.get(back.code) : null; //can use current
          //     if (lst && f.parent.identifier === lst.identifier) {
          //       localTerms.push(f.term)
          //     }
          //   })
          //   // get last parent and filter Above

          //   this.columnData = [...localTerms, ...(e.data.children || [])]
          //     .filter(x => {
          //       return x.category == this.column.code
          //     }).map(mer => {
          //       //**read local children for next */
          //       // const nextChildren = this.frameworkService.getLocalTermsByParent(this.column.code)
          //       // console.log("Saved ======================+>", nextChildren)
          //       /**reset Next level children */
          //       // this.column.children = this.column.children.map(col => { col.selected = false; return col })
          //       // mer.selected = false
          //       mer.children = ([...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift() || [])
          //       return mer
          //     })
          //   // this.updateTerms()
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
    if (this.newTermSubscription) {
      this.newTermSubscription.unsubscribe()
    }
    this.newTermSubscription = this.frameworkService.insertUpdateDeleteNotifier.subscribe(e => {
      if (e && e.action) {
        const next = this.frameworkService.getNextCategory(e.action);
        if (this.column.code === next.code && e.type === 'select') {
          this.insertUpdateHandler(e, next)
        }
      }
    })
  }
  insertUpdateHandler(e, next) {
    debugger
    const back = this.frameworkService.getPreviousCategory(this.column.code)
    console.log('current Saved ===========>', this.frameworkService.getLocalTermsByCategory(this.column.code))
    const localTerms = []
    this.frameworkService.getLocalTermsByCategory(this.column.code).forEach(f => {
      const selectedParent = back ? this.frameworkService.selectionList.get(back.code) : null; //can use current
      if (selectedParent && ((f.parent.code === selectedParent.code) || (f.parent.identifier && (f.parent.identifier === selectedParent.identifier)))) {
        localTerms.push(f.term)
      }
    })
    // get last parent and filter Above

    this.columnData = [...localTerms, ...(e.data.children || [])]
      .filter(x => {
        return x.category == this.column.code
      }).map(mer => {
        //**read local children for next */
        // const nextChildren = this.frameworkService.getLocalTermsByParent(this.column.code)
        // console.log("Saved ======================+>", nextChildren)
        /**reset Next level children */
        // this.column.children = this.column.children.map(col => { col.selected = false; return col })
        // mer.selected = false
        mer.children = ([...this.column.children.filter(x => { return x.code === mer.code }).map(a => a.children)].shift() || [])
        return mer
      })
    // this.updateTerms()

    // console.log(this.columnData)



  }
  updateSelection1(data: any) { }
  updateSelection(selection: any) {
    // console.log(selection.element.code, selection.isSelected)
    // if(this.column.code==='medium'){
    // console.log( this.column.children)
    // }
    // if (selection.element.category === this.column.code) {
    //   this.updateTaxonomyTerm.emit({ isSelected: selection.isSelected, selectedTerm: selection.element })
    // }
    // this.column.children = this.column.children.map(col => {
    //   if (col.code === selection.element.code) {
    //     col.selected = true
    //   } else {
    //     col.selected = false
    //   }
    //   return col
    // })
    console.log(selection)
  }

  get columnItems() {
    // const selected = this.column.children.filter(f => { return f.selected })
    // if (selected.length > 0) {
    //   const data = this.columnData.map(cd => {
    //     cd.selected = this.column.children.filter(f => { return cd.identifier === f.identifier }).map(s => s.selected)[0]
    //     return cd
    //   })
    //   return data
    // } else {
    return this.columnData
    // }
  }
  setConnectors(elementClicked, columnItem, mode) {
    this.removeConnectors(elementClicked, 'box' + (this.column.index - 1), this.column.index - 1)
    console.log('mode', mode)
    console.log('child ', columnItem)
    console.log('elementClicked', elementClicked)
    console.log('connectorMapping', this.connectorMapping)
    if (mode === 'ALL') {
      // let tempconnectorMapping = {}
      // this.connectorService.updateConnectorsMap(tempconnectorMapping)
      // {
      //   ['column' + (this.column.index- 1)]: ''

      // }
      const ids = columnItem.map((c, i) => {
        return this.column.code + 'Card' + (i + 1)
      })
      this.connectorMapping['box' + (this.column.index - 1)] = { source: elementClicked, lines: (ids || []).map(id => { return { target: id, line: '', targetType: 'id' } }) }
      this.connectorService.updateConnectorsMap(this.connectorMapping)
      // console.log('next', next)
      const connectionLines = this.connectorService._drawLine(
        this.connectorMapping['box' + (this.column.index - 1)].source,
        this.connectorMapping['box' + (this.column.index - 1)].lines,
        { startPlug: 'disc', endPlug: 'disc', color: 'black', path: 'grid' },
        '#box' + (this.column.index - 1),
        '#box' + this.column.index
      )
      this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines
      console.log('this.connectorMapping :: ----------------------', this.connectorMapping)
      // if (cat.code === 'board') {
      //   this.connectorService._drawLine('box0card0', this.connectorMapping['board']['box0card0'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
      // } else if (cat.code === 'medium') {
      //   this.connectorService._drawLine('box1card1', this.connectorMapping['medium']['box1card1'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
      // } else if (cat.code === 'gradeLevel') {
      //   this.connectorService._drawLine('box2card7', this.connectorMapping['grade']['box2card7'], {
      //     startPlug: 'disc', endPlug: 'disc', color: 'black'
      //   }, 'box0', 'box1')
    } else {
      console.log('inside else')
      console.log('this.column', this.column)
      const item = this.column.children.findIndex(c => c.selected) + 1
      if (this.column.index > 1) {
        this.connectorMapping['box' + (this.column.index - 1)].lines = [{ target: elementClicked, line: '', targetType: 'element' }]

        this.connectorService.updateConnectorsMap(this.connectorMapping)
        const connectionLines = this.connectorService._drawLine(
          this.connectorMapping['box' + (this.column.index - 1)].source,
          this.connectorMapping['box' + (this.column.index - 1)].lines,
          { startPlug: 'disc', endPlug: 'disc', color: 'black', path: 'grid' },
          '#box' + (this.column.index - 1),
          '#box' + this.column.index
        )
        this.connectorMapping['box' + (this.column.index - 1)].lines = connectionLines
        console.log('this.connectorMapping :: ----------------------', this.connectorMapping)
      }

    }

  }
  removeConnectors(currentElement, prevCol, currentIndex) {
    console.log('prevCol ------------', prevCol)
    if (this.connectorMapping) {
      for (const key in this.connectorMapping) {
        // Remove all n-1 lines and keep only current selection, also clear n+1 lines
        if (this.connectorMapping[key] && this.connectorMapping[key].lines && this.connectorMapping[key].lines.length > 0) {
          const lines = this.connectorMapping[key].lines
          lines.forEach(async (element, index) => {
            if (element != currentElement && prevCol == key) {
              await element.line && element.line.remove();
              lines.splice(index, 1);
            }
          });
          this.connectorMapping[key].lines = lines
        }

        // remove all n+2 lines, if clicks previous columns and tree was already drilled down
        let count = currentIndex + 2;
        let nextCol = `box${count}`
        if (this.connectorMapping[nextCol] && this.connectorMapping[nextCol].lines && this.connectorMapping[nextCol].lines.length > 0) {
          const lines = this.connectorMapping[nextCol].lines
          lines.forEach(async (element, index) => {
            await element.line && element.line.remove();
            lines.splice(index, 1);
          })
          this.connectorMapping[nextCol].lines = null
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