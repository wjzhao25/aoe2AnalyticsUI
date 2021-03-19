import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartPoint, ChartTooltipItem, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { DataService } from '../data-service.service';
import { CivRecord } from '../model/civ-record';
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-global-analytics',
  templateUrl: './global-analytics.component.html',
  styleUrls: ['./global-analytics.component.css']
})
export class GlobalAnalyticsComponent implements OnInit {

  mapsLoaded = false
  civRecordsLoaded = false
  color: ThemePalette = 'primary';
  mode: ProgressSpinnerMode = 'indeterminate';
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
          beginAtZero: false
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: "Total Matches"
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
  public scatterChartData: ChartDataSets[] = [];
  public scatterChartType: ChartType = 'scatter';
  private images: HTMLImageElement[] = [];
  public map: string = "All";
  public maps: String[] = [];
  public eloRange: string = "None";
  public matchType: string = "1v1 Random Map";
  public disableElo: boolean = false;
  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.loadMaps(this.matchType);
    this.populateCivData(this.map, this.eloRange, this.matchType);
  }

  setMap(mapType: string) {
    this.loadMaps(this.matchType);
    this.populateCivData(this.map, this.eloRange, this.matchType);
  }

  setMatchType(matchType: string) {
    this.changeMatchType(this.matchType);
  }

  setElo(eloRange: string) {
    this.eloRange = eloRange;
    this.loadMaps(this.matchType);
    this.populateCivData(this.map, this.eloRange, this.matchType);
  }

  hydrateScatterChart(result: CivRecord[], dataSetLabel: string){
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

  changeMatchType(matchType: string){
    this.mapsLoaded = false
    if (matchType === "1v1 Random Map") {
      this.disableElo = false;
      this.dataService.getGlobalPlayedMaps().subscribe(
        maps => { this.maps = ["All"].concat(maps.map(map => map as string)); 
        this.mapsLoaded = true
        this.map = "All"
        this.populateCivData(this.map, this.eloRange, this.matchType);
      }
      )
    } else if (matchType === "HC4") {
      this.disableElo = true;

      this.dataService.getHC4PlayedMaps().subscribe(
        maps => {
          this.maps = maps.map(map => map as string);
          this.mapsLoaded = true
          this.map = this.maps[0] as string;
          this.populateCivData(this.map, this.eloRange, this.matchType);
        }
      )
    }
    
  }

  loadMaps(matchType: string){
    this.mapsLoaded = false
    if (matchType === "1v1 Random Map") {
      this.disableElo = false;
      this.dataService.getGlobalPlayedMaps().subscribe(
        maps => { this.maps = ["All"].concat(maps.map(map => map as string)); 
        this.mapsLoaded = true
      }
      )
    } else if (matchType === "HC4") {
      this.disableElo = true;

      this.dataService.getHC4PlayedMaps().subscribe(
        maps => {
          this.maps = maps.map(map => map as string);
          this.mapsLoaded = true
        }
      )
    }
    
  }

  populateCivData(mapType: string, eloRange: string, matchType: string) {
    this.civRecordsLoaded = false
    
    if (matchType === "1v1 Random Map") {
      let civsWinRates: Observable<Array<CivRecord>>;
      let dataSetLabel: string = "1v1 Random Map";

      if (eloRange === "None") {
        if (mapType === "All") {
          civsWinRates = this.dataService.getGlobalCivWinRates();
        } else {
          civsWinRates = this.dataService.getGlobalCivWinRatesByMap(mapType);
          dataSetLabel = dataSetLabel + ", " + mapType
        }
      } else {

        if (eloRange === "2500 and above") {
          if (mapType === "All") {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo2500andAbove();
          } else {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo2500andAboveAndMapType(mapType);
          }
        } else if (eloRange === "2000-2500") {
          if (mapType === "All") {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo20002500();
          } else {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo20002500AndMapType(mapType);
          }
        } else if (eloRange === "1500-2000") {
          if (mapType === "All") {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo15002000();
          } else {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo15002000AndMapType(mapType);
          }
        } else if (eloRange === "1000-1500") {
          if (mapType === "All") {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo10001500();
          } else {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo10001500AndMapType(mapType);
          }
        } else if (eloRange === "1000 and below") {
          if (mapType === "All") {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo1000andBelow();
          } else {
            civsWinRates = this.dataService.getGlobalCivWinRatesByElo1000andBelowAndMapType(mapType);
          }
        } else {
          civsWinRates = this.dataService.getGlobalCivWinRates();
        }

        if (mapType !== "All") {
          dataSetLabel = dataSetLabel + ", " + mapType
        }
        dataSetLabel = dataSetLabel + ", " + eloRange
      }

      civsWinRates.subscribe(
        result => {
          this.hydrateScatterChart(result, dataSetLabel);
          this.civRecordsLoaded = true
        }
      )
    } else if (matchType === "HC4") {
      let civsWinRates: Observable<Array<CivRecord>>;
      let dataSetLabel: string = "HC4";


      civsWinRates = this.dataService.getHC4CivWinRatesByMap(mapType);
      dataSetLabel = dataSetLabel + ", " + mapType

      civsWinRates.subscribe(
        result => {
          this.hydrateScatterChart(result, dataSetLabel);
          this.civRecordsLoaded = true
        }
      )
    }

  }


}
