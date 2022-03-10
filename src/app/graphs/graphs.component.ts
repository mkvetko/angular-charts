import {Component, OnInit} from '@angular/core';
import {ChartType} from "angular-google-charts";
import {map, now} from "lodash";
import {DataService} from "../services/data.service";

@Component({
  selector: 'app-graphs',
  templateUrl: './graphs.component.html',
  styleUrls: ['./graphs.component.css']
})
export class GraphsComponent implements OnInit {
  title = 'angular-charts';
  complexData:any;

  dataMapGoogle = new Map();
  dataMapPlotly = new Map();
  dataMapEcharts = new Map();
  option: any;

  constructor(private dataService:DataService) {
  }

  ngOnInit(): void {
    this.complexData = this.dataService.getModelStatistics();
    for (let i = 0; i < this.complexData.visualizations.length; ++i) {
      this.dataMapGoogle.set(this.complexData.visualizations[i].id, this.buildGoogleData(this.complexData.visualizations[i]))
      this.dataMapPlotly.set(this.complexData.visualizations[i].id, this.buildPlotlyData(this.complexData.visualizations[i]))
      this.dataMapEcharts.set(this.complexData.visualizations[i].id, this.buildEchartsOptions(this.complexData.visualizations[i]))
    }
  }

  private buildGoogleData(visualization: any): any {
    let x = map(this.complexData.data, visualization.xValue)
    let y = map(this.complexData.data, visualization.yValue)
    console.log(now() + " Called by: " + visualization.id)

    let result = [];

    for (let i = 0; i < x.length; i++) {
      result.push([x[i], y[i]])
    }
    return result;
  }

  private buildPlotlyData(visualization: any): any {
    let result = [];
    let object;
    if (visualization.chartType === ChartType.PieChart) {
      object = {
        labels: new Array(),
        values: new Array(),
        type: 'pie'
      }
      object.labels = map(this.complexData.data, visualization.xValue)
      object.values = map(this.complexData.data, visualization.yValue)
    } else {
      object = {
        x: new Array(),
        y: new Array(),
        type: ''
      }
      object.x = map(this.complexData.data, visualization.xValue)
      object.y = map(this.complexData.data, visualization.yValue)
      object.type = this.translateChartTypeForPlotly(visualization.chartType)
      //console.log(d3.max(object.x))
    }
    console.log(object)
    result.push(object)
    return result;
  }

  private translateChartTypeForPlotly(type: ChartType): any {
    switch (type) {
      case ChartType.BarChart:
        return 'bar'
      case ChartType.LineChart:
        return 'lines'
      case ChartType.PieChart:
        return 'pie'
      default:
        throw new Error('Unknown chart type: ' + type)
    }
  }


  private buildEchartsOptions(visualization: any) {
    let option;

    if (visualization.chartType !== ChartType.PieChart) {
      option = {
        title: {
          text: visualization.title,
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          feature: {
            saveAsImage: {
              title: 'Save PNG'
            },
            dataView: {
              readOnly: true
            }
          }
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          show: true
        },
        xAxis: new Object(),
        yAxis: {type: 'value'},
        series: new Array()
      }
      option.xAxis = {
        boundaryGap: (visualization.chartType === ChartType.BarChart),
        type: 'category',
        data: map(this.complexData.data, visualization.xValue)
      }
      option.series.push(
        {
          type: this.translateChartTypeForEcharts(visualization.chartType),
          data: map(this.complexData.data, visualization.yValue)
        }
      )
    } else {
      option = {
        title: {
          text: visualization.title,
        },
        tooltip: {
          trigger: 'axis'
        },
        toolbox: {
          show: true,
          orient: 'vertical',
          feature: {
            saveAsImage: {
              title: 'Save PNG'
            },
            dataView: {
              readOnly: true
            }
          }
        },
        legend: {
          show: true
        },
        series: new Array()
      }
      option.series.push(
        {
          type: this.translateChartTypeForEcharts(visualization.chartType),
          data: this.buildPieEchartData(visualization)
        });
    }

    return option;
  }

  private buildPieEchartData(visualization: any) {
    let x = map(this.complexData.data, visualization.xValue)
    let y = map(this.complexData.data, visualization.yValue)
    let result = [];
    for (let i = 0; i < x.length; i++) {
      result.push(
        {
          value: y[i],
          name: x[i]
        });
    }
    return result;
  }

  private translateChartTypeForEcharts(type: ChartType): any {
    switch (type) {
      case ChartType.BarChart:
        return 'bar'
      case ChartType.LineChart:
        return 'line'
      case ChartType.PieChart:
        return 'pie'
      default:
        throw new Error('Unknown chart type: ' + type)
    }
  }

  public jsonToStr(value: any): string {
    return value.text;
  }
}
