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
        return this._apiUrl;
    }
    get token() {
        return this._apiToken;
    }
}
