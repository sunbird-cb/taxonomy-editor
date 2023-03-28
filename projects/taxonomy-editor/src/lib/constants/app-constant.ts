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