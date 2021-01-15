import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CivRecord } from './model/civ-record';
import { PlayerProfile } from './model/player-profile';

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

  getPlayerCivWinRatesByMap(profileId: number, mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('profile_id', profileId+'').set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/player/civs/win-rate'), {params: httpParams})
  }

  getPlayerProfiles(): Observable<Array<PlayerProfile>>{
    return this.http.get<Array<PlayerProfile>>(this.url.concat('/player/profiles'))
  }
  getPlayerPlayedMaps(profileId: number): Observable<Array<String>>{
    let httpParams = new HttpParams().set('profile_id', profileId+'');
    return this.http.get<Array<String>>(this.url.concat('/player/maps'), {params: httpParams})
  }

}
