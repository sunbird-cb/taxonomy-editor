// tslint:disable-next-line: no-namespace
export namespace NSFramework {

    export type TCardSubType =
        | 'standard'
        | 'minimal'
        | 'space-saving'

    export type TNodeStatus =
        | 'draft'
        | 'live'

    export interface ICategory {
        identifier?: string
        name?: string
        description?: string
        status?: TNodeStatus
        code: string
        translations?: any
        index: number
        terms: any[]
    }

    export interface ITerm {
        associations?: ICategory[]
        code: string
        translations?: string | null
        name: string
        description: string
        index?: number
        category: string
        status: TNodeStatus
    }

    export interface ITermCard {
        children: any
        cardSubType: TCardSubType
        deletedMode?: 'greyOut' | 'hide'
        stateData?: any
        selected?: boolean
        category: string
        isViewOnly?: boolean,
        highlight?:boolean
    }

    export interface ISelectedCategory {
        columnCode: string
        children: IFrameworkView[]
    }

    export interface ITermsByCategory {
        categoryIdentifier: string
        categoryLevel: number
        categoryName: string
        categoryCode: string
        terms: ITerm[]
    }
    // {
    //     column1
    //     CBSC
    //     lstOfRows[
    //         {

    //         }
    //     ]

    // }{
    //     column2
    //     HINDI
    //     lstOfRows[
    //         {

    //         }
    //     ]

    // }

    export interface IFrameworkView {
        identifier: string
        code: string
        name: string
        description: string
        children: []
        parent?: any
    }
    export interface IColumnView {
        identifier: string
        name: string
        selected:boolean
        description?: string
        status: TNodeStatus
        code: string
        translations?: any
        index: number
        children: any[],
        category:string,
        associations: string,
        config: any
    }
    export interface ParentsElements {
        identifier: string;
    }
    export interface AdditionalProperties {
    }
    export interface ICreateTerm {
        code: string;
        name: string;
        description: string;
        category: string;
        status: string;
        approvalStatus: string;
        parents?: ParentsElements[] | null;
        additionalProperties: AdditionalProperties;
    }
}



 
 
  