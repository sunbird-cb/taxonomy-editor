import { Component, Input, HostListener } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

import { NodesListService } from './services/nodes-list.service';
import { KEY_CODE } from './KEY_CODE';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'tree-diagram',
  styleUrls: ['./tree.component.scss'],
  templateUrl: './tree.component.html'
})
export class TreeComponent {
  public nodes;
  private config = {
    nodeWidth: 200,
    nodeHeight: 100,
    toggle: false,
    newNode: true,
  };
  private paneDragging = false;
  private paneTransformState;
  private zoom = 1;
  private paneX = 0;
  private paneY = 0;
  private rotationAngleState;
  private rotateAngle = 270
  public rotating = false

  public get paneTransform() {
    return this.paneTransformState;
  }

  public set paneTransform(value) {
    this.paneTransformState = value;
  }
  public get paneRotation() {
    return this.rotationAngleState;
  }

  public set paneRotation(value) {
    this.rotationAngleState = value;
  }
  constructor(
    private nodesSrv: NodesListService,
    private sanitizer: DomSanitizer
  ) {
    this.makeRotation()
  }

  @Input() set data(data: { config: any; json: any[] }) {
    if (!data || !Array.isArray(data.json)) {
      return;
    }

    if (typeof data.config === 'object') {
      this.config = Object.assign(this.config, data.config);
    }

    this.nodes = this.nodesSrv.loadNodes(data.json, this.config);
  }
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {
    if (event.key === KEY_CODE.RIGHT_ARROW) {
      this.shift('right');
    }
    if (event.key === KEY_CODE.LEFT_ARROW) {
      this.shift('left');
    }
    if (event.key === KEY_CODE.UP_ARROW) {
      this.shift('up');
    }
    if (event.key === KEY_CODE.DOWN_ARROW) {
      this.shift('down');
    }
  }
  public get nodeMaker() {
    return this.nodesSrv.makerNode();
  }
  public get newNodeAllowed(){
    return this.config.newNode
  }

  public newNode() {
    this.nodesSrv.newNode();
  }

  public onmousedown() {
    this.paneX = 0
    this.paneY = 0
    this.paneDragging = true;
  }

  public onmousemove(event) {
    event.stopPropagation();

    // if (this.paneDragging) {
    //   const { movementX, movementY } = event;

    //   this.paneX += movementX;
    //   this.paneY += movementY;
    //   this.makeTransform();
    // }
  }

  public onmouseup() {
    this.paneDragging = false;
  }

  public makeTransform() {
    // if (this.paneX < -200 || this.paneY < -200) {
    //   this.paneX = 0
    //   this.paneY = 0
    // }
    this.paneTransform = this.sanitizer.bypassSecurityTrustStyle(
      `translate(${this.paneX}px, ${this.paneY}px) scale(${this.zoom})`
    );
    // translate(${this.paneX}px, ${this.paneY}px)
  }

  public makeRotation() {
    this.rotating = true
    this.paneRotation = this.sanitizer.bypassSecurityTrustStyle(
      `rotate(${this.rotateAngle}deg)`
    );
    this.rotating = false
  }
  rotate(direction: 'c' | 'ac') {
    if (direction === 'c') {
      this.rotateAngle = 0
    } else {
      this.rotateAngle = 270
    }
    this.zoom = 1
    this.paneX = 0
    this.paneY = 0
    this.paneDragging = false
    this.makeTransform()
    this.makeRotation()
  }
  get keysState() {
    return this.rotateAngle / 90
  }
  public preventMouse(event) {
    event.stopPropagation();
  }

  public onmousewheel(event) {
    let delta;
    event.preventDefault();
    delta = event.detail || event.wheelDelta;
    this.zoom += delta / 1000 / 6;
    this.zoom = Math.min(Math.max(this.zoom, 0.1), 3);
    this.makeTransform();
  }
  public fit() {
    this.zoom = 1
    this.paneX = 0
    this.paneY = 0
    this.paneDragging = false
    this.makeTransform();
  }
  zoomIn() {
    this.zoom += 0.1
    this.paneDragging = false
    this.makeTransform();
  }
  zoomOut() {
    this.zoom -= 0.1
    this.paneDragging = false
    this.makeTransform();
  }
  shift(direction: 'up' | 'down' | 'left' | 'right') {
    switch (direction) {
      case 'up':
        // this.paneX -= 100
        this.updateAxis(direction)
        break;
      case 'down':
        // this.paneX += 100
        this.updateAxis(direction)
        break;
      case 'left':
        // this.paneY += 100
        this.updateAxis(direction)
        break;
      case 'right':
        // this.paneY -= 100
        this.updateAxis(direction)
        break;
    }
    this.makeTransform();
  }
  updateAxis(direction: 'up' | 'down' | 'left' | 'right') {
    if (Math.abs(this.keysState) === 0) {
      this.paneY += direction === 'up' ? 100 : 0
      this.paneY += direction === 'down' ? -100 : 0
      this.paneX += direction === 'left' ? -100 : 0
      this.paneX += direction === 'right' ? 100 : 0
    }
    if (Math.abs(this.keysState) === 1) {
      this.paneX += direction === 'up' ? -100 : 0
      this.paneX += direction === 'down' ? 100 : 0
      this.paneY += direction === 'left' ? 100 : 0
      this.paneY += direction === 'right' ? -100 : 0
    }
    if (Math.abs(this.keysState) === 2) {
      this.paneY += direction === 'up' ? -100 : 0
      this.paneY += direction === 'down' ? 100 : 0
      this.paneX += direction === 'left' ? 100 : 0
      this.paneX += direction === 'right' ? -100 : 0
    }
    if (Math.abs(this.keysState) === 3) {
      this.paneX += direction === 'up' ? -100 : 0
      this.paneX += direction === 'down' ? 100 : 0
      this.paneY += direction === 'left' ? 100 : 0
      this.paneY += direction === 'right' ? -100 : 0
    }
  }
}
