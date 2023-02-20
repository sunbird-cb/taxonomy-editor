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
        identifier?: string,
        name?: string,
        description?: string,
        status?: TNodeStatus,
        code?: string,
        translations?: any
        index?: number
        terms: any[]
    }

    export interface ITerm {
        associations: ICategory[]
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
        selected?: boolean
    }

    export interface ISelectedCategory {
        identifier: string,
        level: number,
        category: ICategory
    }

    export interface ITermsByCategory {
        categoryIdentifier: string,
        categoryLevel: number,
        categoryName: string,
        categoryCode: string,
        terms: ITerm[]
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
