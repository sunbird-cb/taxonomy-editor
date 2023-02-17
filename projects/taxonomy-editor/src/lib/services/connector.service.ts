/* eslint-disable */
import { Injectable } from '@angular/core';

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
  startPlugOutlineColor: 'rgb(255, 0, 0)',
  endPlug: 'disc',
  endPlugColor: 'white',
  endPlugOutlineColor: 'rgb(255, 0, 0)',
  color: 'black',
  size: 4,
  path: 'grid'
}

@Injectable()
export class ConnectorService {

  constructor() { }

  _drawLine(source, target, options: LLOptions, sourceContainerId = undefined, targetContainerId = undefined) {
    
    const _options = <LLOptions>{...defaultConfig, ...options}
    let _line;
    if (Array.isArray(target)) {
      target.forEach((_target) => {
        _line = this.renderLine(source, _target, _options);
      });
    } else {
      _line = this.renderLine(source, target, _options);
    }
    if(sourceContainerId) {
      document.querySelector(sourceContainerId).addEventListener('scroll', () => {
        _line.position();
      }, false);
    }
    if (targetContainerId) {
      document.querySelector(targetContainerId).addEventListener('scroll', () => {
        _line.position();
      }, false);
    }
  }

  private renderLine(source, target, options: LLOptions) {
    console.log(source)
    console.log(target)
    let _options = {
      animOptions: { duration: 3000, timing: 'linear' },
      hide: true,
    };

    // using Element Refs
    // let _line = new LeaderLine(source,target, _options);
    // using IDs
    let _line = new LeaderLine(document.getElementById(source), document.getElementById(target), _options);
    _line.endPlugOutline = true;
    _line.startPlugOutline = true;
    _line.setOptions(options);
    _line.show('draw');
    return _line;
  }
}
