import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedService } from '../services/shared.service';
import { ChartData, ChartType } from 'chart.js';
import { HttpClient } from '@angular/common/http';

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
    { title: 'canceled RDVs', value: '5%', bgColor: 'bg-danger' },
    { title: 'loyal clients', value: '30%', bgColor: 'bg-warning' }
  ];

  chartConfigs: {
    title: string;
    type: ChartType;
    data: ChartData<ChartType, any, any>;
    options?: any;
  }[] = [];

  constructor(private route: ActivatedRoute, private sharedService: SharedService, private http: HttpClient) {}

ngOnInit(): void {
  const routeId = this.route.snapshot.paramMap.get('id');
  this.expertId = routeId ? +routeId : this.sharedService.getExpertId();

  this.http.get<any>(`http://localhost:8089/appointment/expert-statistics/${this.expertId}`).subscribe(data => {
    this.updateStatCards(data);
    this.updateCharts(data);
  });
}

updateStatCards(data: any) {
  this.statCards = [
    { title: 'Total Appointments', value: data.totalAppointments, bgColor: 'bg-primary' },
    { title: 'New Clients', value: data.newClients, bgColor: 'bg-success' },
    { title: 'canceled RDVs', value: `${data.canceledAppointments}`, bgColor: 'bg-danger' },
    { title: 'loyal clients', value: `${data.loyalClients}`, bgColor: 'bg-warning' }
  ];
}

updateCharts(data: any) {
  this.chartConfigs = [
    {
      title: 'Appointments per Week',
      type: 'bar',
      data: {
        labels: Object.keys(data.appointmentsPerWeek),
        datasets: [{
          label: 'Appointments',
          data: Object.values(data.appointmentsPerWeek),
          backgroundColor: '#007bff'
        }]
      }
    },
    {
      title: 'Online vs In-Person',
      type: 'doughnut',
      data: {
        labels: ['Online', 'In-Person'],
        datasets: [{
          data: [data.onlineCount, data.inPersonCount],
          backgroundColor: ['#20c997', '#6f42c1']
        }]
      }
    },
    // You can keep the remaining charts static or use data creatively
    {
      title: 'Loyal vs New Clients',
      type: 'pie',
      data: {
        labels: ['Loyal', 'New'],
        datasets: [{
          data: [data.loyalClients, data.newClients],
          backgroundColor: ['#198754', '#ffc107']
        }]
      }
    },
    {
      title: 'Canceled Appointments',
      type: 'polarArea',
      data: {
        labels: ['Canceled', 'Others'],
        datasets: [{
          data: [data.canceledAppointments, data.totalAppointments - data.canceledAppointments],
          backgroundColor: ['#dc3545', '#0d6efd']
        }]
      }
    }
  ];
}
}
