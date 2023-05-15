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

type plugType = 'disc' | 'square' | 'hand' | 'arrow1' | 'arrow2' | 'arrow3';
type pathType = 'straight' | 'arc' | 'fluid' | 'magnet' | 'grid';

export interface LLOptions {
    startPlug?: plugType,
    startPlugColor?: string,
    startPlugSize?: Number,
    startPlugOutlineColor?: string,
    endPlug?: plugType,
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

export const headerLineConfig = {
       endPlugColor:'#b9b9b9',
       endPlugOutlineColor:'#b9b9b9',
       color:'#b9b9b9',
       startPlug: 'behind'
}