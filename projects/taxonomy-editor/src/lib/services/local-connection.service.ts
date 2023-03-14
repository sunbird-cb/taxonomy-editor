import { Inject, Injectable } from '@angular/core';
import { IConnectionType } from '../models/connection-type.model';
import { ENVIRONMENT } from './connection.service';

@Injectable({
    providedIn: 'root'
})
export class LocalConnectionService {

    private _vars: IConnectionType = {
        data: {
            endpoint: '',
            frameworkName: '',
            token: ''
        },
        source: 'online'
    }

    constructor(@Inject(ENVIRONMENT) private env: IConnectionType) {
        if (env) {
            this._vars.data.endpoint = env.data.endpoint;
            this._vars.data.token = env.data.token;
            this._vars.data.frameworkName = env.data.frameworkName;
        }
    }
    get apiUrl() {
        if (this.localStorage.data.endpoint) {
            return this.localStorage.data.endpoint
        }
        return this._vars.data.endpoint;
    }
    get token() {
        if (this.localStorage.data.token) {
            return this.localStorage.data.token
        }
        return this._vars.data.token;
    }
    get frameworkName() {
        if (this.localStorage.data.frameworkName) {
            return this.localStorage.data.frameworkName
        }
        return this._vars.data.frameworkName;
    }
    get connectionType() {
        if (this.localStorage.source) {
            return this.localStorage.source
        }
        return this._vars.source
    }
    set localStorage(val: IConnectionType) {
        localStorage.setItem('env', JSON.stringify(val))
    }
    get localStorage(): IConnectionType {
        const val = localStorage.getItem('env')
        if (val !== 'undefined' && val !== null) {
            return JSON.parse(localStorage.getItem('env') || `{"source":"online","data":{}}`)
        }
        return JSON.parse(`{"source":"online", "data":{}}`)
    }
    updateLocalStorage(val: IConnectionType) {
        this.localStorage = val
    }
    clearLocalStorage() {
        localStorage.removeItem('env')
        localStorage.removeItem('terms')
    }
}
