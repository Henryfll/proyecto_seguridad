import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalisisService {

  url_API=environment.api_VirusTotal;
 
  
  constructor(
    public _http:HttpClient
  ) { }

  analizarUrls(url:string){

    const headers = new HttpHeaders({
      'x-apikey': "1a496307803e5fdf92d6371afb8c4c42bca58e462dd50a32dae2da3b3c33b549"
    });

    let url_ws=`${this.url_API}/urls/${url}`;
    return this._http.get<any>(url_ws, { headers });
  }

}
