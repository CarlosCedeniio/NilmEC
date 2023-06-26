import { Component, OnInit } from '@angular/core';

import '../../../../assets/charts/amchart/amcharts.js';
import '../../../../assets/charts/amchart/gauge.js';
import '../../../../assets/charts/amchart/pie.js';
import '../../../../assets/charts/amchart/serial.js';
import '../../../../assets/charts/amchart/light.js';
import '../../../../assets/charts/amchart/ammap.js';
import '../../../../assets/charts/amchart/worldLow.js';
import * as moment from 'moment';
import {ToastrService} from 'ngx-toastr';

declare const AmCharts: any;
declare const $: any;

@Component({
  selector: 'app-dashboard-default',
  templateUrl: './dashboard-default.component.html',
  styleUrls: [
    './dashboard-default.component.scss',
    '../../../../assets/icon/svg-animated/svg-weather.css'
  ]
})
export class DashboardDefaultComponent implements OnInit {
  totalValueGraphData1 = buildChartJS('#fff', [45, 25, 35, 20, 45, 20, 40, 10, 30, 45], '#3a73f1', 'transparent');
  totalValueGraphData2 = buildChartJS('#fff', [10, 25, 35, 20, 10, 20, 15, 45, 15, 10], '#e55571', 'transparent');
  totalValueGraphOption = buildChartOption();
  actualComsumption = 400.24;
  current = 14;
  updateTime = moment().format('dddd hh:mm:ss');
  data = [{
    year: 0,
    value: 0.98
  }, {
    year: 1,
    value: 1.87
  }, {
    year: 2,
    value: 0.97
  }, {
    year: 3,
    value: 1.64
  }, {
    year: 4,
    value: 0.4
  }, {
    year: 5,
    value: 2.9
  }, {
    year: 6,
    value: 5.2
  }, {
    year: 7,
    value: 0.77
  }, {
    year: 8,
    value: 3.1
  }];

  counter = 9;
  todaySpent = 3;
  foundDevices = 3;
  startDay = moment().add('days', -1).endOf('day').format('dddd hh:mm:ss');
  toastFlag = true;

  constructor(private toastr: ToastrService) { }

  ngOnInit() {
    const chart = AmCharts.makeChart('statistics-chart', {
      hideCredits: true,
      type: 'serial',
      marginTop: 0,

      marginRight: 0,
      dataProvider: this.data,
      valueAxes: [{
        axisAlpha: 0,
        dashLength: 6,
        gridAlpha: 0.1,
        position: 'left'
      }],
      graphs: [{
        id: 'g1',
        bullet: 'round',
        bulletSize: 9,
        lineColor: '#4680ff',
        lineThickness: 2,
        negativeLineColor: '#4680ff',
        type: 'smoothedLine',
        valueField: 'value'
      }],
      chartCursor: {
        cursorAlpha: 0,
        valueLineEnabled: false,
        valueLineBalloonEnabled: true,
        valueLineAlpha: false,
        color: '#fff',
        cursorColor: '#FC6180',
        fullWidth: true
      },
      categoryField: 'year',
      categoryAxis: {
        gridAlpha: 0,
        axisAlpha: 0,
        fillAlpha: 1,
        fillColor: '#FAFAFA',
        minorGridAlpha: 0,
        minorGridEnabled: true,
      },
      'export': {
        enabled: true
      }
    });

    AmCharts.makeChart('solid-gauge1', {
      type: 'gauge',

      theme: 'light',
      axes: [{
        axisAlpha: 0,
        tickAlpha: 0,
        labelsEnabled: false,
        startValue: 0,
        endValue: 100,
        startAngle: 0,
        endAngle: 360,
        bands: [{
          color: '#E5E5E5',
          startValue: -35,
          endValue: 35,
          radius: '100%',
          innerRadius: '92%'
        }, {
          color: '#93BE52',
          startValue: -35,
          endValue: 20,
          radius: '100%',
          innerRadius: '92%'
        }]
      }],
      'export': {
        enabled: true
      }
    });

    AmCharts.makeChart('email-sent', {
      type: 'serial',
      theme: 'light',

      dataDateFormat: 'YYYY-MM-DD',
      precision: 2,
      valueAxes: [
        {
          id: 'v1',
          title: 'Consumo por dispositivo',
          position: 'left',
          autoGridCount: false,
          labelFunction: function (g) {
            return Math.round(g);
          }
        },
        {
          id: 'v2',
          title: 'Consumo total',
          gridAlpha: 0,
          fontSize: 10,
          axesAlpha: 0,
          position: 'right',
          autoGridCount: false,
          labelFunction: function (g) {
            return Math.round(g);
          }
        }
      ],
      graphs:
        [
          {
            id: 'g3',
            valueAxis: 'v1',
            lineColor: '#4680ff',
            fillColors: '#4680ff',
            fillAlphas: 1,
            type: 'column',
            title: 'AC',
            valueField: 'AC',
            clustered: true,
            columnWidth: 0.4,
            legendValueText: '[[value]] Kw',
            balloonText: '[[title]]<br /><b style="font-size: 130%">[[value]]Kw</b>'
          },
          {
            id: 'g4',
            valueAxis: 'v1',
            lineColor: '#FC6180',
            fillColors: '#FC6180',
            fillAlphas: 1,
            type: 'column',
            title: 'Luces',
            valueField: 'Lights',
            clustered: true,
            columnWidth: 0.4,
            legendValueText: '[[value]] Kw',
            balloonText: '[[title]]<br /><b style="font-size: 130%">[[value]]Kw</b>'
          },
          {
            id: 'v3',
            valueAxis: 'v1',
            lineColor: '#FFB64D',
            fillColors: '#FFB64D',
            fillAlphas: 1,
            type: 'column',
            title: 'Otros',
            valueField: 'Others',
            clustered: true,
            columnWidth: 0.4,
            legendValueText: '[[value]] Kw',
            balloonText: '[[title]]<br /><b style="font-size: 130%">[[value]]Kw</b>'
          },
          {
            id: 'g1',
            valueAxis: 'v2',
            bullet: 'round',
            bulletBorderAlpha: 0,
            bulletColor: 'transparent',
            bulletSize: 0,
            hideBulletsCount: 50,
            lineThickness: 3,
            dashLength: 10,
            lineColor: '#93BE52',
            type: 'smoothedLine',
            title: 'Consumo total',
            useLineColorForBulletBorder: true,
            valueField: 'TotalConsumption',
            balloonText: '[[title]]<br /><b style="font-size: 130% ">[[value]]</b>'
          },
        ],
      chartCursor: {
        pan: true,
        valueLineEnabled: true,
        valueLineBalloonEnabled: true,
        cursorAlpha: 0,
        valueLineAlpha: 0.2
      },
      categoryField: 'date',
      categoryAxis: {
        parseDates: true,
        dashLength: 0,
        axisAlpha: 0,
        GridAlpha: 0,
        minorGridEnabled: true
      },
      legend: {
        useGraphSettings: true,
        position: 'top'
      },
      balloon: {
        borderThickness: 1,
        shadowAlpha: 0
      },
      'export': {
        enabled: true
      },
      dataProvider: [
        {
          date: '2023-01-16',
          TotalConsumption: 310,
          Others: 145,
          AC: 125,
          Lights: 40
        },
        {
          date: '2023-01-17',
          TotalConsumption: 301,
          Others: 136,
          AC: 125,
          Lights: 40
        },
        {
          date: '2023-01-18',
          TotalConsumption: 319,
          Others: 154,
          AC: 125,
          Lights: 40
        },
        {
          date: '2023-01-19',
          TotalConsumption: 350,
          Others: 185,
          AC: 125,
          Lights: 40
        },
        {
          date: '2023-01-20',
          TotalConsumption: 330,
          Others: 144,
          AC: 146,
          Lights: 40
        },
        {
          date: '2023-01-21',
          TotalConsumption: 380,
          Others: 200,
          AC: 140,
          Lights: 40
        },
        {
          date: '2023-01-22',
          TotalConsumption: 398,
          Others: 138,
          AC: 200,
          Lights: 60
        }
      ]
    });



    setInterval(() => {
      const random = 6 + Math.random() * 3;
      this.actualComsumption += random;
      this.data.push({
        year: this.counter,
        value: random
      }, );
      console.log(this.data);
      this.counter += 1;
      chart.validateData();
      this.updateTime = moment().format('dddd hh:mm:ss');
      this.todaySpent = this.todaySpent + Math.random() * 0.02;
      this.current = this.current + ((Math.random() * 2)) - 1;
      this.totalValueGraphData1.datasets[0].data.push(17);
      if (this.actualComsumption>450 && this.toastFlag){
        this.showSuccess();
      }



    }, 5000);
  }

  showSuccess() {
    this.toastFlag = false;
    this.toastr.warning('Has superado el limite de consumo para el gasto de hoy', 'Alerta de consumo', {timeOut: 20000} );
  }






  onTaskStatusChange(event) {
    const parentNode = (event.target.parentNode.parentNode);
    parentNode.classList.toggle('done-task');
  }

}

function getRandomData() {
  let data = [];
  const totalPoints = 300;
  if (data.length > 0) {
    data = data.slice(1);
  }

  while (data.length < totalPoints) {
    const prev = data.length > 0 ? data[data.length - 1] : 50;
    let y = prev + Math.random() * 10 - 5;
    if (y < 0) {
      y = 0;
    } else if (y > 100) {
      y = 100;
    }
    data.push(y);
  }

  const res = [];
  for (let i = 0; i < data.length; ++i) {
    res.push([i, data[i]]);
  }
  return res;
}

function buildChartJS(a, b, f, c) {
  if (f == null) {
    f = 'rgba(0,0,0,0)';
  }
  return {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October'],
    datasets: [{
      label: '',
      borderColor: a,
      borderWidth: 2,
      hitRadius: 30,
      pointHoverRadius: 4,
      pointBorderWidth: 50,
      pointHoverBorderWidth: 12,
      pointBackgroundColor: c,
      pointBorderColor: 'transparent',
      pointHoverBackgroundColor: a,
      pointHoverBorderColor: 'rgba(0,0,0,0.5)',
      fill: true,
      backgroundColor: f,
      data: b,
    }]
  };
}

function buildChartOption() {
  return {
    title: {
      display: false
    },
    tooltips: {
      enabled: true,
      intersect: false,
      mode: 'nearest',
      xPadding: 10,
      yPadding: 10,
      caretPadding: 10
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: false
      }
    },
    responsive: true,
    maintainAspectRatio: false,
    hover: {
      mode: 'index'
    },
    scales: {
      xAxes: [{
        display: false,
        gridLines: false,
        scaleLabel: {
          display: true,
          labelString: 'Month'
        }
      }],
      yAxes: [{
        display: false,
        gridLines: false,
        scaleLabel: {
          display: true,
          labelString: 'Value'
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    elements: {
      point: {
        radius: 4,
        borderWidth: 12
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 5,
        bottom: 0
      }
    }
  };
}
