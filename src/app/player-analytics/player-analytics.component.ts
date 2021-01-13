import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, ChartOptions, ChartPoint, ChartData, ChartTooltipItem } from 'chart.js';
import { DataService } from '../data-service.service';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-player-analytics',
  templateUrl: './player-analytics.component.html',
  styleUrls: ['./player-analytics.component.css']
})

export class PlayerAnalyticsComponent implements OnInit {

  isChartPoint(obj: number | null | undefined | number[] | ChartPoint): obj is ChartPoint {
    if((obj as ChartPoint).x){
      return true
    }
    return false
  }

  public scatterChartOptions: ChartOptions = {
    responsive: true,
    tooltips : {
      callbacks: {
        label: (tooltipItem: ChartTooltipItem, data: ChartData) => {
          tooltipItem.index
          let dataset = data.datasets
          if(dataset){
            let dataPoint = dataset[0].data
            const index: number = tooltipItem.index || 0;
            if(dataPoint){

              if(this.isChartPoint(dataPoint[index])){
                const chartPoint = (dataPoint[index] as ChartPoint)
                const label = `${chartPoint.t}: [ win rate: ${(chartPoint.y as number).toFixed(2)}, total matches: ${chartPoint.x} ]`
                return label as string;
              }
              
            }
          }
          return  "Error";
        }
      }
    },
    scales: {
      yAxes: [{
        scaleLabel: {
          display: true,
          labelString : "Win Rate (%)"
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString : "Total Matches"
        }
      }]
    }
  };
  public chartLabels: Label[] = [];
  public scatterChartData: ChartDataSets[] = [];
  public scatterChartType: ChartType = 'scatter';
  private images: HTMLImageElement[] = [];
  private civImageURLMap = new Map([
    ["Aztecs", "https://static.wikia.nocookie.net/ageofempires/images/0/0c/CivIcon-Aztecs.png"],
    ["Berbers", "https://static.wikia.nocookie.net/ageofempires/images/7/71/CivIcon-Berbers.png"],
    ["Britons", "https://static.wikia.nocookie.net/ageofempires/images/a/ae/CivIcon-Britons.png"],
    ["Bulgarians", "https://static.wikia.nocookie.net/ageofempires/images/c/ce/CivIcon-Bulgarians.png"],
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
    ["Slavs", "https://static.wikia.nocookie.net/ageofempires/images/1/12/CivIcon-Slavs.png "],
    ["Spanish", "https://static.wikia.nocookie.net/ageofempires/images/0/0a/CivIcon-Spanish.png"],
    ["Tatars", "https://static.wikia.nocookie.net/ageofempires/images/f/f2/CivIcon-Tatars.png"],
    ["Teutons", "https://static.wikia.nocookie.net/ageofempires/images/3/3f/CivIcon-Teutons.png"],
    ["Turks", "https://static.wikia.nocookie.net/ageofempires/images/1/1c/CivIcon-Turks.png"],
    ["Vietnamese", "https://static.wikia.nocookie.net/ageofempires/images/0/07/CivIcon-Vietnamese.png"],
    ["Vikings", "https://static.wikia.nocookie.net/ageofempires/images/c/c9/CivIcon-Vikings.png"]
  ]);


  constructor(private dataService: DataService) { }

  ngOnInit(): void {

    this.dataService.getPlayerCivWinRates(251265).subscribe(
      result => {
        this.images = result.map(res => {
          let image = new Image(50, 50);
          const civ = res.name as string;
          image.src = this.civImageURLMap.get(civ) || "";
          return image;
        }) as any;
        this.scatterChartData = [
          {
            data: result.map(res => {
              const point: ChartPoint = { x: res.totalMatches , y: res.winRate, t: res.name as string }
              return point;
            }),
            pointStyle: this.images,
            label: "Civ dataset"
          },
        ];

      }
    );

  }

}
