export interface Card {
    approvalStatus?: string,
    associations?: Array<Card>,
    identifier?: string,
    code?: string,
    translations?: any,
    name?: string,
    description?: string,
    index?: number,
    additionalProperties?: any,
    category?: string,
    status?: string,
    icon?: string,
    color?: string,
    children?: Array<Card>,
    highlight?: boolean,
    associationProperties?: associationProperties,
    selected?: boolean,
    config?: Config,
    parents?: any
}

export interface  CardSelection {
    element?: Array<Card>,
    selectedTerm?: Array<Card>,
    isSelected: boolean
}

export interface CardChecked {
    term: Card,
    checked: boolean
}

export interface associationProperties {
    approvalStatus?: string
}

export interface CardsCount {
    category: string,
    count: number
}

export interface Config {
    index: number,
    category: string,
    icon: string,
    color: string
}