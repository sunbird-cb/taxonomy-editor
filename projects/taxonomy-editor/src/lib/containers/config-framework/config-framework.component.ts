import { Component, OnInit } from '@angular/core';
import { FrameworkService } from '../../services/framework.service';
import { categoryRepresentations, categoryRepresentationsV1 } from '../../constants/data'
declare var LeaderLine: any;

@Component({
  selector: 'lib-config-framework',
  templateUrl: './config-framework.component.html',
  styleUrls: ['./config-framework.component.scss']
})
export class ConfigFrameworkComponent implements OnInit {
  frameworkCategories;
  categoriesRepresentations = [];
  tempCategoryRepresentaions = []
  oldElements = []
  constructor(private frameworkService: FrameworkService) { }

  ngOnInit() {
    this.frameworkService.getFrameworkInfo().subscribe(res => {
      console.log('Service...',res)
      this.frameworkCategories = res.result.framework.categories
    })
    // this.categoriesRepresentations = categoryRepresentationsV1
  }

//   updateCategory(data){
//     for(let i=0;i<data.length;i++) {
//         this.tempCategoryRepresentaions.push(
//           {
//             name: data[i].name,
             
//             terms:this.updateTermArry(data[i].name, data[i+1]?data[i+1].name:'', i)
//           }
//         )
//     }
//     this.categoriesRepresentations = this.tempCategoryRepresentaions;
//   }



//   updateTermArry(current,next, index){
//     let term = []
//     if(index%2 === 0){
//       term = [
//         {
//           name:`${current} 1`,
//           domId:`${current}1`
//         },
//         {
//           name: `${current} 2`,
//           selected:true,
//           connected:true,
//           domId:`${current.toLowerCase()}2`,
//           connectedDomId:next?`${next.toLowerCase()}1`:''
//         }
//       ]
//     } else {
//       term = [
//         {
//           name:`${current} 1`,
//           selected:true,
//           connected:true,
//           domId:`${current.toLowerCase()}1`,
//           connectedDomId:next?`${next.toLowerCase()}2`:''
//         },
//         {
//           name: `${current} 2`,
//           domId:`${current}2`
//         }
//       ]
//     }
//     return term
//   }
// }




  updateCategory(name){
    this.removeOldLine()
    this.tempCategoryRepresentaions.push(
          {
            name: name,
            terms:this.updateTermArry(name,  this.categoriesRepresentations[this.categoriesRepresentations.length -1], this.categoriesRepresentations.length)
          }
    )
    this.categoriesRepresentations = [...this.tempCategoryRepresentaions]    
}

  updateTermArry(current, parent, index){
    let term = []
    if(index%2 === 0) {
      term = [
        {
          name:`${current} 1`,
          domId:`${current}1`
        },
        {
          name: `${current} 2`,
          selected:true,
          connected:true,
          domId:`${current.toLowerCase()}2`,
          parent:parent ? `${parent.terms[0].domId}`:''
        }
      ]
    } else {
      term = [
        {
          name:`${current} 1`,
          selected:true,
          connected:true,
          domId:`${current.toLowerCase()}1`,
          parent:parent?`${parent.terms[1].domId}`:''
        },
        {
          name: `${current} 2`,
          domId:`${current}2`
        }
      ]
    }
    return term
  }

  removeOldLine() {
    const eles = Array.from(document.getElementsByClassName('leader-line') || [])
    if(eles.length>0){
        eles.forEach(ele => ele.remove());
    }
  }

  removeCategory(index){
    this.categoriesRepresentations.splice(index,1)
    const temp = [...this.categoriesRepresentations]
    this.categoriesRepresentations = []
    temp.forEach(cat => {
      this.updateCategory(cat.name)
    })
  }

}
