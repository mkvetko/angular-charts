import { Injectable } from '@angular/core';
import {ChartType} from "angular-google-charts";

@Injectable({
  providedIn: 'root'
})
export class DataService {

  modelStatistics = {
    "data": [
      {
        "period": "20220110",
        "modelMetrics": {
          "value1": 1,
          "value2": 2,
          "value3": 3
        }
      },
      {
        "period": "20220111",
        "modelMetrics": {
          "value1": 11,
          "value2": 22,
          "value3": 33
        }
      },
      {
        "period": "20220112",
        "modelMetrics": {
          "value1": 111,
          "value2": 222,
          "value3": 333
        }
      }
    ]
    ,
    "visualizations": [
      {
        "id": 1,
        "title": "Pie",
        "chartType": ChartType.PieChart,
        "xValue": "period",
        "yValue": "modelMetrics.value1"
      },
      {
        "id": 2,
        "title": "Line",
        "chartType": ChartType.LineChart,
        "xValue": "period",
        "yValue": "modelMetrics.value2"
      },
      {
        "id": 3,
        "title": "Bar",
        "chartType": ChartType.BarChart,
        "xValue": "period",
        "yValue": "modelMetrics.value3"
      }
    ]

  }

  constructor() { }

  getModelStatistics() {
    return this.modelStatistics;
  }
}
