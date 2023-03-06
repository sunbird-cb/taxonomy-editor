import { InjectionToken } from '@angular/core';
import { IConnectionType } from '../models/connection-type.model';
export const ENVIRONMENT: InjectionToken<IConnectionType> = new InjectionToken('ENVIRONMENT');
