import { Component, OnInit } from '@angular/core';
import { ChartData, ChartDataSets, ChartOptions, ChartPoint, ChartTooltipItem, ChartType } from 'chart.js';
import { Label } from 'ng2-charts';
import { Observable } from 'rxjs';
import { DataService } from '../data-service.service';
import { CivRecord } from '../model/civ-record';

@Component({
  selector: 'app-global-analytics',
  templateUrl: './global-analytics.component.html',
  styleUrls: ['./global-analytics.component.css']
})
export class GlobalAnalyticsComponent implements OnInit {

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
  public map: string = "All";
  public maps: String[] = [];

  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.populateCivData(this.map);
  }

  setMap(mapType: string) {
    this.populateCivData(this.map);
  }

  populateCivData(mapType: string) {
    this.dataService.getGlobalPlayedMaps().subscribe(
      maps => {this.maps = ["All"].concat(maps.map(map => map as string));}
    )

    let civsWinRates: Observable<Array<CivRecord>>;
    let dataSetLabel: string = "1v1 Random Map";
    if(mapType === "All"){
      civsWinRates = this.dataService.getGlobalCivWinRates();
    }else{
      civsWinRates = this.dataService.getGlobalCivWinRatesByMap(mapType);
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
      )

    }
  

}
