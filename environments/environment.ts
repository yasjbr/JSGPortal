// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import { HttpHeaders } from '@angular/common/http';



export const environment = {
  production: false,
  apiBaseUrl: 'http://localhost:50536/api/',
 
  //  apiBaseUrl: 'http://localhost:50536/api/',
  // apiBaseUrl: 'http://myschool:97/api/',
  jsonAPI: '/assets/data/',
  langAPI: '/assets/api',
  urlPrefix: '',
  httpOptions: {
    headers: new HttpHeaders({ 
    })
  }
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
