import {Injectable} from '@angular/core';

@Injectable()
export class Environment {
  readonly API_URL: string = '//map.evanogra.com';
}

@Injectable()
export class LocalEnvironment extends Environment{
  readonly API_URL = 'http://localhost:3000';
}
