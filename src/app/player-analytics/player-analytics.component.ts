import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions, ChartPoint, ChartData, ChartTooltipItem } from 'chart.js';
import { DataService } from '../data-service.service';
import { Label } from 'ng2-charts';
import { FormGroup, FormControl } from '@angular/forms';
import { PlayerProfile } from '../model/player-profile';
import { Observable, of } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { CivRecord } from '../model/civ-record';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';
import { MatTabChangeEvent } from '@angular/material/tabs';
@Component({
  selector: 'app-player-analytics',
  templateUrl: './player-analytics.component.html',
  styleUrls: ['./player-analytics.component.css']
})

export class PlayerAnalyticsComponent implements OnInit {
  loaded = false
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
  playerName = new FormControl("GL.TheViper");
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

  public winRateChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      mode: 'nearest',
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
                const label = `${chartPoint.t}: [ win rate: ${chartPoint.y}%, total matches: ${chartPoint.x} ]`
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
          labelString: "Win Rate %"
        },
        ticks: {
          max: 100
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Total Matches"
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    layout: {
      padding: {
        right: 25
      }
    }
  };

  public loseRateChartOptions: ChartOptions = {
    responsive: true,
    tooltips: {
      mode: 'nearest',
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
                const label = `${chartPoint.t}: [ lose rate: ${chartPoint.y}%, total matches: ${chartPoint.x} ]`
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
          labelString: "Lose Rate %"
        },
        ticks: {
          max: 100
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Total Matches"
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    layout: {
      padding: {
        right: 25
      }
    }
  };

  public chartLabels: Label[] = [];
  public winRateChartData: ChartDataSets[] = [];
  public loseRateChartData: ChartDataSets[] = [];
  public scatterChartType: ChartType = 'scatter';
  private images: HTMLImageElement[] = [];
  private playerProfileIds: Array<PlayerProfile> = [];
  public filteredOptions: Observable<Array<PlayerProfile>> = of();
  public map: string = "All";
  public maps: String[] = [];
  public chartTypes: string[] = ['Win Rate', 'Lose Rate'];
  public chartType: number = 0;
  constructor(private dataService: DataService) { }

  setChartType(tabChangeEvent: MatTabChangeEvent) {
    this.chartType = tabChangeEvent.index
    this.onSubmit()
  }

  populateWinRateData(mapType: string, profile: PlayerProfile, dataSetLabel: string) {
    let civsWinRates: Observable<Array<CivRecord>>;
    if (mapType === "All") {
      civsWinRates = this.dataService.getPlayerCivWinRates(profile.profileId);
    } else {
      civsWinRates = this.dataService.getPlayerCivWinRatesByMap(profile.profileId, mapType);
      dataSetLabel = dataSetLabel + ", " + mapType
    }
    civsWinRates.subscribe(
      result => {
        this.images = result.map(res => {
          let image = new Image(50, 50);


          const civ = res.name as string;
          image.src = this.dataService.civImageURLMap.get(civ) || "";

          return image;
        }) as any;
        this.winRateChartData = [
          {
            data: result.map(res => {
              const point: ChartPoint = { x: res.totalMatches, y: res.winRate, t: res.name as string }
              return point;
            }),
            pointStyle: this.images,
            label: dataSetLabel,
            pointHitRadius: 25
          },
        ];
        this.loaded = true
      }
    );
  }

  populateLoseRateData(mapType: string, profile: PlayerProfile, dataSetLabel: string) {
    let civsLoseRates: Observable<Array<CivRecord>>;
    if (mapType === "All") {
      civsLoseRates = this.dataService.getPlayerCivLoseRates(profile.profileId);
    } else {
      civsLoseRates = this.dataService.getPlayerCivLoseRatesByMap(profile.profileId, mapType);
      dataSetLabel = dataSetLabel + ", " + mapType
    }
    civsLoseRates.subscribe(
      result => {
        this.images = result.map(res => {
          let image = new Image(50, 50);


          const civ = res.name as string;
          image.src = this.dataService.civImageURLMap.get(civ) || "";

          return image;
        }) as any;
        this.loseRateChartData = [
          {
            data: result.map(res => {
              const point: ChartPoint = { x: res.totalMatches, y: res.winRate, t: res.name as string }
              return point;
            }),
            pointStyle: this.images,
            label: dataSetLabel,
            pointHitRadius: 25
          },
        ];
        this.loaded = true
      }
    );
  }

  populateCivData(playerName: string, mapType: string) {
    this.loaded = false
    const profile = this.playerProfileIds.find(profile => profile.name === playerName)
    if (profile) {
      this.playerProfile = profile;
      this.dataService.getPlayerPlayedMaps(profile.profileId).subscribe(
        maps => { this.maps = ["All"].concat(maps.map(map => map as string)); }
      )

      let dataSetLabel: string = "1v1 Random Map";
      if (this.chartType === 0) {
        this.populateWinRateData(mapType, profile, dataSetLabel)
      } else if (this.chartType === 1) {
        this.populateLoseRateData(mapType, profile, dataSetLabel)
      }

    }
  }

  setPlayerName(name: string) {
    this.playerName.setValue(name);
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

    if (!name) {
      return this.playerProfileIds;
    }
    const filterValue = name.toLowerCase();
    return this.playerProfileIds.filter(profile => profile.name.toLowerCase().includes(filterValue));
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
        startWith(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this._filter(name) : this.playerProfileIds.slice())
      );

  }

}
