export const APPROVAL = {

    INITIATE: "INITIATE",
    LEVEL1: "SEND_FOR_REVIEW_L1",
    LEVEL2: "SEND_FOR_REVIEW_L2",
    SEND_FOR_PUBLISH: "SEND_FOR_PUBLISH",

    ACTION: "INITIATE",
    SERVICE_NAME: "taxonomy",

    CREATE:"/api/workflow/taxonomy/create",
    SEARCH:"/api/workflow/taxonomy/search",
    READ: '/api/workflow/taxonomy/read',
    UPDATE: 'api/workflow/taxonomy/update',

    APPROVE:'APPROVE',
    REJECT: 'REJECT'
}

export const LIVE = 'Live'
export const DRAFT = 'Draft'

export const COLORS = ['#1d2327','#541675','#9a6c80','#d8666a'];

type plugType = 'disc' | 'square' | 'hand' | 'arrow1' | 'arrow2' | 'arrow3';
type pathType = 'straight' | 'arc' | 'fluid' | 'magnet' | 'grid';

export interface LLOptions {
    startPlug: plugType,
    startPlugColor?: string,
    startPlugSize?: Number,
    startPlugOutlineColor?: string,
    endPlug: plugType,
    endPlugColor?: string,
    endPlugSize?: Number,
    endPlugOutlineColor?: string,
    color?: string,
    size?: number,
    path?: pathType,
    startSocket?: string,
    endSocket?: string,
    dash?: any
  };
  
export const defaultConfig: LLOptions = {
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
    path: 'grid',
    startSocket: 'right', endSocket: 'left',
    dash: {len: 6, gap: 3}
  }