import { Inject, Injectable } from '@angular/core';
import { IConnection } from '../models/connection.model';
import { ENVIRONMENT } from './connection.service';

@Injectable({
    providedIn: 'root'
})
export class LocalConnectionService {

    private _apiUrl = '';
    private _apiToken = ''

    constructor(@Inject(ENVIRONMENT) private env: IConnection) {
        if (env) {
            this._apiUrl = env.endpoint;
            this._apiToken = env.token;
        }
    }
    get apiUrl() {
        if (this.localStorage.endpoint) {
            return this.localStorage.endpoint
        }
        return this._apiUrl;
    }
    get token() {
        if (this.localStorage.token) {
            return this.localStorage.token
        }
        return this._apiToken;
    }
    set localStorage(val: IConnection) {
        localStorage.setItem('env', JSON.stringify(val))
    }
    get localStorage() {
        return JSON.parse(localStorage.getItem('env') || '{}')
    }
    updateLocalStorage(val: IConnection) {
        this.localStorage = val
    }
    clearLocalStorage() {
        localStorage.removeItem('env')
    }
}
