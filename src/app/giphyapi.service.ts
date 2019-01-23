import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GiphyapiService {

  result : any;
  input: string;

  constructor(private http:HttpClient) {}
    private url = `https://api.giphy.com/v1/gifs/search?q=`
    private url2 = `&api_key=pU7mSFwd4cRwC7wIBd6D3e7sBKabBRzQ`;


    public getInfo(searchterm : string): Observable<any[]>{
        return this.http.get<any[]>(this.url + searchterm + this.url2);
    }
}
