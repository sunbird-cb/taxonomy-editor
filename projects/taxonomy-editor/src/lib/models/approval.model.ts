export interface IApproval {
    applicationStatus:string
    serviceName:string
}

export interface IApproveRequest {
    wfId: string
    state: string
    action: string
    serviceName: string
}