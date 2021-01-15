import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions, ChartPoint, ChartData, ChartTooltipItem } from 'chart.js';
import { DataService } from '../data-service.service';
import { Label } from 'ng2-charts';
import { FormGroup, FormControl } from '@angular/forms';
import { PlayerProfile } from '../model/player-profile';
import { Observable, of } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { CivRecord } from '../model/civ-record';

@Component({
  selector: 'app-player-analytics',
  templateUrl: './player-analytics.component.html',
  styleUrls: ['./player-analytics.component.css']
})

export class PlayerAnalyticsComponent implements OnInit {

  playerName = new FormControl("MbL40C");
  playerProfile: PlayerProfile = {
    profileId: 0,
    steamId: "",
    rank: 0,
    rating: 0,
    name: "",
    country: "",
    games: 0,
    wins: 0,
    losses: 0,
    drops: 0
  };

  isChartPoint(obj: number | null | undefined | number[] | ChartPoint): obj is ChartPoint {
    if ((obj as ChartPoint).x) {
      return true
    }
    return false
  }

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      callbacks: {
        label: (tooltipItem: ChartTooltipItem, data: ChartData) => {
          tooltipItem.index
          let dataset = data.datasets
          if (dataset) {
            let dataPoint = dataset[0].data
            const index: number = tooltipItem.index || 0;
            if (dataPoint) {

              if (this.isChartPoint(dataPoint[index])) {
                const chartPoint = (dataPoint[index] as ChartPoint)
                const label = `${chartPoint.t}: [ win rate: ${(chartPoint.y as number * 100).toFixed(0)}%, total matches: ${chartPoint.x} ]`
                return label as string;
              }

            }
          }
          return "Error";
        }
      }
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Win Rate"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Total Matches"
        }
      }]
    }
  };
  public chartLabels: Label[] = [];
  public scatterChartData: ChartDataSets[] = [];
  public scatterChartType: ChartType = 'scatter';
  private images: HTMLImageElement[] = [];
  private playerProfileIds: Array<PlayerProfile> = [];
  public filteredOptions: Observable<Array<PlayerProfile>> = of();
  public map: string = "All";
  public maps: String[] = [];


  constructor(private dataService: DataService) { }

  populateCivData(playerName: string, mapType: string) {
    const profile = this.playerProfileIds.find(profile => profile.name === playerName)
    if (profile) {
      this.playerProfile = profile;
      this.dataService.getPlayerPlayedMaps(profile.profileId).subscribe(
        maps => {this.maps = ["All"].concat(maps.map(map => map as string));}
      )
      let civsWinRates: Observable<Array<CivRecord>>;
      let dataSetLabel: string = "1v1 Random Map";
      if(mapType === "All"){
        civsWinRates = this.dataService.getPlayerCivWinRates(profile.profileId);
      }else{
        civsWinRates = this.dataService.getPlayerCivWinRatesByMap(profile.profileId, mapType);
        dataSetLabel = dataSetLabel + " " + mapType
      }
      civsWinRates.subscribe(
        result => {
          this.images = result.map(res => {
            let image = new Image(50, 50);
            const civ = res.name as string;
            image.src = this.dataService.civImageURLMap.get(civ) || "";
            return image;
          }) as any;
          this.scatterChartData = [
            {
              data: result.map(res => {
                const point: ChartPoint = { x: res.totalMatches, y: res.winRate, t: res.name as string }
                return point;
              }),
              pointStyle: this.images,
              label: dataSetLabel
            },
          ];

        }
      );
    }
  }

  setPlayerName(name: string) {
    this.populateCivData(name, this.map);
  }

  setMap(mapType: string) {
    this.populateCivData(this.playerName.value, this.map)
  }

  onSubmit() {
    this.populateCivData(this.playerName.value, this.map)
  }

  displayFn(name: string): string {
    return name;
  }

  private _filter(name: string): Array<PlayerProfile> {
    const filterValue = name.toLowerCase();
    return this.playerProfileIds.filter(profile => profile.name.toLowerCase().indexOf(filterValue) === 0);
  }

  ngOnInit(): void {
    this.dataService.getPlayerProfiles().subscribe(
      result => {
        this.playerProfileIds = result;
        this.populateCivData(this.playerName.value, this.map)
      }
    );
    this.filteredOptions = this.playerName.valueChanges
      .pipe(
        take(10),
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.playerProfileIds.slice(0, 10))
      );

  }

}
