/* eslint-disable */
import { ElementRef, Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { FrameworkService } from './framework.service';

declare var LeaderLine: any;

type plugType = 'disc' | 'square' | 'hand' | 'arrow1' | 'arrow2' | 'arrow3';
type pathType = 'straight' | 'arc' | 'fluid' | 'magnet' | 'grid';


export interface LLOptions {
  startPlug: plugType,
  startPlugColor?: string,
  startPlugOutlineColor?: string,
  endPlug: plugType,
  endPlugColor?: string,
  endPlugOutlineColor?: string,
  color?: string,
  size?: number,
  path?: pathType,
};

const defaultConfig = {
  startPlug: 'disc',
  startPlugColor: 'white',
  startPlugSize: 3,
  startPlugOutlineColor: '#515151',
  endPlug: 'arrow3',
  endPlugColor: 'white',
  endPlugSize: 3,
  endPlugOutlineColor: '#515151',
  color: '#515151',
  size: 1,
  path: 'magnet',
  startSocket: 'right', endSocket: 'left',
  dash: {len: 6, gap: 3}
}

@Injectable()
export class ConnectorService {
  connectorMap: any = {}
  elmWrapper: any
  // assuming following structure
  // {
  //   'box1': {
  //     source: ElementRef,
  //     lines: [
  //       {
  //         target:' card2 of box1', 
  //         line: '_line prototype object'
  //       }
  //     ]
  //   }
  // }

  constructor(private frameworkService: FrameworkService) { 
    // this.frameworkService.list.forEach((list, index)=> {
    //   this.connectorMap['box'+list.index]= {}
    // })
    console.log('connectorMap -------', this.connectorMap)
  }

  _drawLine(source, target, options: LLOptions, sourceContainerId = undefined, targetContainerId = undefined) {
    console.log('sourceContainerId ::', sourceContainerId)
    console.log('targetContainerId ::', targetContainerId)
    const _options = <LLOptions>{...defaultConfig, ...options}
    let _line;
    if (Array.isArray(target)) {
      // target.forEach((_target) => {
      //   _line = this.renderLine(source, _target, _options);
      // });
      let connectedDots = [];
      target.forEach((_target) => {
        const tempLine = this.renderLine(source, _target, _options)
        connectedDots.push(
        {
          target: _target, // ref element
          line: tempLine
        })
        if(sourceContainerId) {
          document.querySelector(sourceContainerId) && document.querySelector(sourceContainerId).addEventListener('scroll', () => {
            try{
              tempLine && tempLine.position();
            } catch(e) {
              // console.log('Error')
            }
          }, true);
        }
        if (targetContainerId) {
          document.querySelector(targetContainerId) && document.querySelector(targetContainerId).addEventListener('scroll', () => {
            try{
              tempLine && tempLine.position();
            } catch(e) {
              // console.log('Error')
            }
          }, true);
        }
        // tempLine.show('draw')

      });
    return connectedDots;
    } else {
      _line = this.renderLine(source, target, _options);
    }
  }

  private renderLine(source, target, options: LLOptions) {
    let _options = {
      animOptions: { duration: 2000, timing: 'linear' },
      hide: true,
      // startSocketGravity: 50,
      // endSocketGravity: [-30, 50]
    };
    let _line
    if(target.targetType === 'id'){
      _line = new LeaderLine(source, document.getElementById(target.target), _options);
    }
    else {
      _line = new LeaderLine(source, target.target, _options);
    }

    _line.endPlugOutline = true;
    _line.startPlugOutline = true;
    // _line.positionByWindowResize = false;
    _line.setOptions(options);
    _line.show('draw');
    // this.elmWrapper.appendChild(document.querySelector('.leader-line:last-of-type'));
    // this.position(_line)
    return _line;
  }

  updateConnectorsMap(map){
    this.connectorMap = map
  }

  position(line) {
    this.elmWrapper.style.transform = 'none';
    var rectWrapper = this.elmWrapper.getBoundingClientRect();
    // Move to the origin of coordinates as the document
    this.elmWrapper.style.transform = 'translate(' +
      ((rectWrapper.left + pageXOffset) * -1) + 'px, ' +
      ((rectWrapper.top + pageYOffset) * -1) + 'px)';
    line.position();
  }

  removeAllLines() {
    if(this.connectorMap) {
      for (const key in this.connectorMap) {
        // Remove all n-1 lines and keep only current selection, also clear n+1 lines
        if(this.connectorMap[key] && this.connectorMap[key].lines && this.connectorMap[key].lines.length > 0) {
          const lines = this.connectorMap[key].lines
          lines.forEach(async (element, index) => {
              await element.line && element.line.remove();
              lines.splice(index, 1);
          });
          this.connectorMap[key].lines = lines
        }
      }
    }
    // to reset connector map after clearing all the lines
    this.updateConnectorsMap({})
  }
}