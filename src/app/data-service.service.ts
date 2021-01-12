import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CivRecord } from './model/civ-record';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = "http://localhost:8080"

  constructor(private http: HttpClient) { }

  getPlayerCivWinRates(profileId: number): Observable<Array<CivRecord>>{

    let httpParams = new HttpParams().set('profile_id', profileId+'');
    return this.http.get<Array<CivRecord>>(this.url.concat('/player/civs/win-rate'), {params: httpParams})
  }

}
