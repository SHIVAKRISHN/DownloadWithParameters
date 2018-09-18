import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';

import { environment } from '.././environments/environment';

import { Http, Response, Headers,RequestMethod, RequestOptions,ResponseContentType } from '@angular/http';

import { map } from 'rxjs/operators';

import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root'
})
export class AppServerService {

  constructor(

    private http:HttpClient,
    private oldHttp : Http,
    private sanitizer: DomSanitizer
  ) { }

  downloadTheRecepit(paymentObj)
{



  let headerOptions = new Headers({'Content-Type': 'application/json', 
  'Accept': 'application/pdf',
  'x-auth-token':  localStorage.getItem('token'),
  'tenentId': localStorage.getItem('tenentId')});     	    	
    let requestOptions = new RequestOptions({method : RequestMethod.Get, headers : headerOptions}); 
    
    let options_test = new RequestOptions({ headers: headerOptions });
// Ensure you set the responseType to Blob.
options_test.responseType = ResponseContentType.Blob;

    
      this.oldHttp.post("http://localhost:8080/myWebApp/download/methodOne",paymentObj,options_test).pipe(map(data => {
        console.log(data);

        console.log(data);
        let fileBlob = data.blob();
        let blob = new Blob([fileBlob], { 
           type: 'application/pdf' // must match the Accept type
        });
        
        let url = window.URL.createObjectURL(blob);
        this.sanitizer.bypassSecurityTrustUrl(url);
        const anchor = document.createElement('a');
anchor.href = url;

anchor.target = "_blank";
anchor.click();
      })).subscribe((result : any) => {
      });

}

  
}
