import { IConnection } from "./connection.model"

export interface IConnectionType {
    source: 'online' | 'offline'
    data: IConnection
}