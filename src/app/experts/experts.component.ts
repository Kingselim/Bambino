import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 

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

  currentPage: number = 1;
  expertsPerPage: number = 6;


  constructor(private http: HttpClient, private router: Router) {}

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
        (this.searchQuery ? expert.name.toLowerCase().includes(this.searchQuery.toLowerCase()) : true) &&
        (this.selectedRole ? expert.specialty === this.selectedRole : true)
      );
    });
  
    this.currentPage = 1; // ✅ Reset pagination when filtering
    console.log('Filtered experts:', this.filteredExperts);
  }
  

  goToAppointments() {
    this.router.navigate(['/appointments']);
  }

  get paginatedExperts() {
    const startIndex = (this.currentPage - 1) * this.expertsPerPage;
    return this.filteredExperts.slice(startIndex, startIndex + this.expertsPerPage);
  }
  
  changePage(page: number) {
    this.currentPage = page;
  }
  
  get totalPages(): number[] {
    return Array.from({ length: Math.ceil(this.filteredExperts.length / this.expertsPerPage) }, (_, i) => i + 1);
  }
  
  
}
