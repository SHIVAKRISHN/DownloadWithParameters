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

  ExportPdfInAngular2(dataObj)
{



  let headerOptions = new Headers({
  
  'Content-Type': 'application/json', 
  'Accept': 'application/pdf',
 
});     	    	
    
    
    let options = new RequestOptions({ headers: headerOptions });
// Ensure you set the responseType to Blob.
    options.responseType = ResponseContentType.Blob;

    
      this.oldHttp.post("http://localhost:8080/myWebApp/download/methodOne",dataObj,options).pipe(map(data => {
       // console.log(data);

        //console.log(data);
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

ExportPdfInAngular6(dataObj)
{

  let headerOptions = new HttpHeaders({
  'Content-Type': 'application/json', 
  'Accept': 'application/pdf',
 });

    let requestOptions = { headers : headerOptions,responseType : 'blob' as 'blob'}; 
    
  
    
      this.http.post("http://localhost:8080/myWebApp/download/methodOne",dataObj,requestOptions).pipe(map((data : any) => {
      
        let fileBlob = data;
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
