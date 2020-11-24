import { DateHelper } from './../../../helpers/helper';
import { DateTime } from 'luxon';
import { Observable } from 'rxjs';
import { FirebaseService } from './../../../services/firebase.service';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  orders$: Observable<any[]>
  chart: any;
  constructor(private database: FirebaseService) {
    this.orders$ = database.getAllOrders();
  }

  public lineChartLabels = [];
  public lineChartData: ChartDataSets[] = [{ data: [], label: "Revenue per day", pointRadius: 7  },
  { data: [], label: "Orders per day", yAxisID: 'y-axis-1', pointRadius: 7 }];
  public lineChartType: ChartType = 'line';
  public lineChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{}],
      yAxes: [
        {
          id: 'y-axis-0',
          position: 'left',
          ticks: {
            fontColor: 'red',
          }
        },
        {
          id: 'y-axis-1',
          position: 'right',
          ticks: {
            fontColor: 'blue',
            stepSize: 1,
            beginAtZero: true
          }
        }
      ]
    },
    elements: {
      line: {
        fill: false
      }

    }
  }

  ngOnInit(): void {
    this.orders$.subscribe(res => {
      //Getting data from database
      let data = res.map(res => {
        return {
          "date": res.date,
          "total": res.total,
          "number": 1
        }
      })
      //Sorting on date (date here is in milliseconds)
      data.sort((a, b) => {
        return a.date - b.date;
      })
      //Transfering dates to string (dd/mm/yyyy)
      let dataStringDate = data.map(item => Object.assign({}, item, { date: DateHelper.millisToDate(item.date) }))
      //Merging data where the date is same
      let mergedData = this.mergeObjectsInUnique(dataStringDate, "date");

      //Assigning data to lineChart
      this.lineChartLabels = mergedData.map(item => item.date)
      this.lineChartData[0].data = mergedData.map(item => item.total);
      this.lineChartData[1].data = mergedData.map(item => item.number);
    })
  }


  // Function for merging data in an array based on a property
  mergeObjectsInUnique<T>(array: T[], property: any): T[] {
    const newArray = new Map();
    array.forEach((item: any) => {
      const propertyValue = item[property];
      newArray.has(propertyValue) ? newArray.set(propertyValue, Object.assign({}, item, {
        total: item.total + newArray.get(propertyValue).total,
        number: item.number + newArray.get(propertyValue).number,
      })) : newArray.set(propertyValue, item);
    });
    return Array.from(newArray.values());
  }



}
