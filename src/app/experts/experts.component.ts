import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-experts',
  templateUrl: './experts.component.html',
  styleUrls: ['./experts.component.css']
})
export class ExpertsComponent implements OnInit {
  experts: any[] = [];
  filteredExperts: any[] = [];
  searchQuery: string = '';
  selectedRole: string = '';
  roles: string[] = ['Doctor', 'Nutritionist', 'Coach']; // You can make this dynamic based on backend data

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchExperts();
  }

  fetchExperts() {
    this.http.get<any[]>('http://localhost:8089/expert/retrieve-all-experts').subscribe(data => {
      console.log(data);  // Add this line to log the data
      this.experts = data;
      this.filteredExperts = data;
    }, error => {
      console.error('Error fetching experts:', error);  // Log error if any
    });
  }

  onSearchChange() {
    this.applyFilters();
  }

  onRoleChange() {
    this.applyFilters();
  }

  applyFilters() {
    console.log('Filtering experts with search:', this.searchQuery, 'and role:', this.selectedRole);  // Log to check filter values
  
    this.filteredExperts = this.experts.filter(expert => {
      return (
        // Check if searchQuery matches expert name (case-insensitive)
        (this.searchQuery ? expert.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true) &&
        
        // Check if selectedRole matches expert specialty
        (this.selectedRole ? expert.specialty === this.selectedRole : true)
      );
    });
  
    console.log('Filtered experts:', this.filteredExperts);  // Log filtered list
  }
  
}
