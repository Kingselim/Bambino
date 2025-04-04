import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ChartData, ChartType } from 'chart.js';

@Component({
  selector: 'app-expert-statistics',
  templateUrl: './expert-statistics.component.html',
  styleUrls: ['./expert-statistics.component.css']
})
export class ExpertStatisticsComponent implements OnInit {
  expertId: number = this.sharedService.getExpertId();


  statCards = [
    { title: 'Total Appointments', value: 42, bgColor: 'bg-primary' },
    { title: 'New Clients', value: 18, bgColor: 'bg-success' },
    { title: 'Missed Sessions', value: 5, bgColor: 'bg-danger' },
    { title: 'Weekly Hours', value: '30h', bgColor: 'bg-warning' }
  ];

  chartConfigs: {
    title: string;
    type: ChartType;
    data: ChartData<ChartType, any, any>;
    options?: any;
  }[] = [];

  constructor(private route: ActivatedRoute, private sharedService: SharedService) {}

  ngOnInit(): void {
    const routeId = this.route.snapshot.paramMap.get('id');
    this.expertId = routeId ? +routeId : this.sharedService.getExpertId();
    console.log('Stats for expert:', this.expertId);

    this.chartConfigs = [
      {
        title: 'Bar Chart',
        type: 'bar',
        data: {
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [{ label: 'Sessions', data: [12, 19, 3, 5], backgroundColor: '#007bff' }]
        }
      },
      {
        title: 'Line Chart',
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
          datasets: [{ label: 'Hours', data: [3, 2, 2, 4, 3], borderColor: '#28a745', fill: false }]
        }
      },
      {
        title: 'Pie Chart',
        type: 'pie',
        data: {
          labels: ['Nutrition', 'Therapy', 'Checkups'],
          datasets: [{ data: [20, 30, 50], backgroundColor: ['#ffc107', '#dc3545', '#17a2b8'] }]
        }
      },
      {
        title: 'Doughnut Chart',
        type: 'doughnut',
        data: {
          labels: ['In-person', 'Online'],
          datasets: [{ data: [60, 40], backgroundColor: ['#6f42c1', '#20c997'] }]
        }
      },
      {
        title: 'Radar Chart',
        type: 'radar',
        data: {
          labels: ['Empathy', 'Punctuality', 'Expertise', 'Communication'],
          datasets: [{
            label: 'Ratings',
            data: [4, 5, 4, 3],
            backgroundColor: 'rgba(0,123,255,0.2)',
            borderColor: '#007bff'
          }]
        }
      },
      {
        title: 'Polar Area Chart',
        type: 'polarArea',
        data: {
          labels: ['Morning', 'Afternoon', 'Evening'],
          datasets: [{
            data: [11, 16, 7],
            backgroundColor: ['#fd7e14', '#6610f2', '#198754']
          }]
        }
      },
      {
        title: 'Bubble Chart',
        type: 'bubble',
        data: {
          datasets: [{
            label: 'Clients',
            data: [
              { x: 10, y: 20, r: 10 },
              { x: 15, y: 10, r: 15 },
              { x: 25, y: 30, r: 5 }
            ],
            backgroundColor: '#0dcaf0'
          }]
        }
      }
    ];
  }
}
