import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { CivRecord } from './model/civ-record';
import { PlayerProfile } from './model/player-profile';
import { environment } from './../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  url = environment.apiUrl

  constructor(private http: HttpClient) { }

  
  getGlobalCivWinRates(): Observable<Array<CivRecord>>{
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate'))
  }

  
  getGlobalCivWinRatesByMap(mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate'), {params: httpParams})
  }

  getGlobalCivWinRatesByElo1000andBelow(): Observable<Array<CivRecord>>{
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/1000andBelow'))
  }
  
  getGlobalCivWinRatesByElo10001500(): Observable<Array<CivRecord>>{
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/10001500'))
  }
  
  getGlobalCivWinRatesByElo15002000(): Observable<Array<CivRecord>>{
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/15002000'))
  }
  
  getGlobalCivWinRatesByElo20002500(): Observable<Array<CivRecord>>{
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/20002500'))
  }
  
  getGlobalCivWinRatesByElo2500andAbove(): Observable<Array<CivRecord>>{
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/2500andAbove'))
  }

  getGlobalCivWinRatesByElo1000andBelowAndMapType(mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/1000andBelow'), {params: httpParams})
  }
  
  getGlobalCivWinRatesByElo10001500AndMapType(mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/10001500'), {params: httpParams})
  }
  
  getGlobalCivWinRatesByElo15002000AndMapType(mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/15002000'), {params: httpParams})
  }
  
  getGlobalCivWinRatesByElo20002500AndMapType(mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/20002500'), {params: httpParams})
  }
  
  getGlobalCivWinRatesByElo2500andAboveAndMapType(mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/global/civs/win-rate/2500andAbove'), {params: httpParams})
  }

  getPlayerCivWinRates(profileId: number): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('profile_id', profileId+'');
    return this.http.get<Array<CivRecord>>(this.url.concat('/player/civs/win-rate'), {params: httpParams})
  }

  getPlayerCivWinRatesByMap(profileId: number, mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('profile_id', profileId+'').set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/player/civs/win-rate'), {params: httpParams})
  }

  getPlayerCivLoseRates(profileId: number): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('profile_id', profileId+'');
    return this.http.get<Array<CivRecord>>(this.url.concat('/player/civs/lose-rate'), {params: httpParams})
  }

  getPlayerCivLoseRatesByMap(profileId: number, mapType: string): Observable<Array<CivRecord>>{
    let httpParams = new HttpParams().set('profile_id', profileId+'').set('map_type', mapType);
    return this.http.get<Array<CivRecord>>(this.url.concat('/player/civs/lose-rate'), {params: httpParams})
  }

  getPlayerProfiles(): Observable<Array<PlayerProfile>>{
    return this.http.get<Array<PlayerProfile>>(this.url.concat('/player/profiles'))
  }

  getGlobalPlayedMaps(): Observable<Array<String>>{
    return this.http.get<Array<String>>(this.url.concat('/global/maps'))
  }

  getPlayerPlayedMaps(profileId: number): Observable<Array<String>>{
    let httpParams = new HttpParams().set('profile_id', profileId+'');
    return this.http.get<Array<String>>(this.url.concat('/player/maps'), {params: httpParams})
  }


  public civImageURLMap = new Map([
    ["Aztecs", "https://static.wikia.nocookie.net/ageofempires/images/0/0c/CivIcon-Aztecs.png"],
    ["Berbers", "https://static.wikia.nocookie.net/ageofempires/images/7/71/CivIcon-Berbers.png"],
    ["Britons", "https://static.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png"],
    ["Bulgarians", "https://static.wikia.nocookie.net/ageofempires/images/c/ce/CivIcon-Bulgarians.png"],
    ["Burgundians", "https://static.wikia.nocookie.net/ageofempires/images/5/5e/Menu_techtree_burgundians.png"],
    ["Burmese", "https://static.wikia.nocookie.net/ageofempires/images/7/79/CivIcon-Burmese.png"],
    ["Byzantines", "https://static.wikia.nocookie.net/ageofempires/images/2/27/CivIcon-Byzantines.png"],
    ["Celts", "https://static.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Celts.png"],
    ["Chinese", "https://static.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Chinese.png"],
    ["Cumans", "https://static.wikia.nocookie.net/ageofempires/images/c/cc/CivIcon-Cumans.png"],
    ["Ethiopians", "https://static.wikia.nocookie.net/ageofempires/images/c/cb/CivIcon-Ethiopians.png"],
    ["Franks", "https://static.wikia.nocookie.net/ageofempires/images/1/1b/CivIcon-Franks.png"],
    ["Goths", "https://static.wikia.nocookie.net/ageofempires/images/2/24/CivIcon-Goths.png"],
    ["Huns", "https://static.wikia.nocookie.net/ageofempires/images/1/17/CivIcon-Huns.png"],
    ["Incas", "https://static.wikia.nocookie.net/ageofempires/images/5/5e/CivIcon-Incas.png"],
    ["Indians", "https://static.wikia.nocookie.net/ageofempires/images/8/8b/CivIcon-Indians.png"],
    ["Italians", "https://static.wikia.nocookie.net/ageofempires/images/e/e1/CivIcon-Italians.png"],
    ["Japanese", "https://static.wikia.nocookie.net/ageofempires/images/9/9a/CivIcon-Japanese.png"],
    ["Khmer", "https://static.wikia.nocookie.net/ageofempires/images/e/ec/CivIcon-Khmer.png"],
    ["Koreans", "https://static.wikia.nocookie.net/ageofempires/images/7/73/CivIcon-Koreans.png"],
    ["Lithuanians", "https://static.wikia.nocookie.net/ageofempires/images/0/0d/CivIcon-Lithuanians.png"],
    ["Magyars", "https://static.wikia.nocookie.net/ageofempires/images/6/68/CivIcon-Magyars.png"],
    ["Malay", "https://static.wikia.nocookie.net/ageofempires/images/c/c3/CivIcon-Malay.png"],
    ["Malians", "https://static.wikia.nocookie.net/ageofempires/images/8/80/CivIcon-Malians.png"],
    ["Mayans", "https://static.wikia.nocookie.net/ageofempires/images/0/05/CivIcon-Mayans.png"],
    ["Mongols", "https://static.wikia.nocookie.net/ageofempires/images/1/10/CivIcon-Mongols.png"],
    ["Persians", "https://static.wikia.nocookie.net/ageofempires/images/a/ad/CivIcon-Persians.png"],
    ["Portuguese", "https://static.wikia.nocookie.net/ageofempires/images/6/60/CivIcon-Portuguese.png"],
    ["Saracens", "https://static.wikia.nocookie.net/ageofempires/images/5/59/CivIcon-Saracens.png"],
    ["Sicilians", "https://static.wikia.nocookie.net/ageofempires/images/7/7f/Menu_techtree_sicilians.png"],
    ["Slavs", "https://static.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png "],
    ["Spanish", "https://static.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png"],
    ["Tatars", "https://static.wikia.nocookie.net/ageofempires/images/f/f2/CivIcon-Tatars.png"],
    ["Teutons", "https://static.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png"],
    ["Turks", "https://static.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png"],
    ["Vietnamese", "https://static.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png"],
    ["Vikings", "https://static.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png"]
  ]);
}
