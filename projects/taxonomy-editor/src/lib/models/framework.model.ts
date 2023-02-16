// tslint:disable-next-line: no-namespace
export namespace NSFramework {

    export type TCardSubType =
        | 'standard'
        | 'minimal'
        | 'space-saving'

    export type TNodeStatus =
        | 'draft'
        | 'live'

    export interface Icategory {
        identifier?: string,
        name?: string,
        description?: string,
        status?:TNodeStatus,
    }

    export interface ITerm {
        associations: Icategory[]
        identifier: string
        code: string
        translations: string | null
        name: string
        description: string
        index: number
        category: string
        status: TNodeStatus
    }

    export interface ITermCard {
        term: ITerm
        cardSubType: TCardSubType
        deletedMode?: 'greyOut' | 'hide'
        stateData?: any
        selected?:boolean
    }

    export interface ISelectedCategory {
        identifier: string,
        level:number,

        category: Icategory
    }

    // {
    //     column1
    //     CBSC,
    //     lstOfRows[
    //         {

    //         }
    //     ]

    // },{
    //     column2
    //     HINDI,
    //     lstOfRows[
    //         {

    //         }
    //     ]

    // }

}
