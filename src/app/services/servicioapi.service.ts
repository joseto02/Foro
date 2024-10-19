import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServicioapiService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    })
  }

  apiURL = 'https://api.rawg.io/api/games?key=e968279615fd429a9afbf9ca2618bcc2&dates=2023-01-01,2024-10-31&ordering=-released'


  constructor(private http: HttpClient) { }

  getGames(): Observable<any>{
    return this.http.get(this.apiURL).pipe(
      retry(3)
    )
  }

  getNextPage(url:string): Observable<any>{
    return this.http.get(url).pipe(
      retry(3)
    )
  }

}
