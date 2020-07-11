import { HttpHeaders } from '@angular/common/http';

export const environment = {
  production: true,

 
  apiBaseUrl: 'http://localhost:50873/api/',
 


  
  jsonAPI: '/assets/data/',
  
  
  
  
  
  ////// this is local message
  
  
  
  
  /// this is remote messge
  langAPI: '/assets/api',
  urlPrefix: '', 
  httpOptions: {
    headers: new HttpHeaders({
    })
  }
};
