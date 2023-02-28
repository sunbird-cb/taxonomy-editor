import { InjectionToken } from '@angular/core';
import { IConnection } from '../models/connection.model';
export const ENVIRONMENT: InjectionToken<IConnection> = new InjectionToken('ENVIRONMENT');
