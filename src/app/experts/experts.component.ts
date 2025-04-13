import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; 
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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


  // Rating modal properties
  selectedExpert: any = null;
  selectedRating: number = 0;
  hoverRating: number = 0;



  constructor(private http: HttpClient, private router: Router,private modalService: NgbModal) {}

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

  goToMap() {
    this.router.navigate(['/nearest-experts']);
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

  




  openRatingModal(expert: any, content: any) {
    this.selectedExpert = expert;
    this.selectedRating = 0;
    this.hoverRating = 0;
    this.modalService.open(content, { centered: true });
  }

  setRating(rating: number) {
    this.selectedRating = rating;
  }

  setHoverRating(rating: number) {
    this.hoverRating = rating;
  }

  resetHoverRating() {
    this.hoverRating = this.selectedRating;
  }

  submitRating() {
    if (this.selectedRating > 0 && this.selectedExpert) {
      // Here you would typically send the rating to your backend
      console.log(`Rating ${this.selectedExpert.name} with ${this.selectedRating} stars`);
      
      // Example API call (uncomment and adjust as needed):
      /*
      this.http.post(`http://localhost:8089/expert/rate/${this.selectedExpert.id}`, {
        rating: this.selectedRating
      }).subscribe(response => {
        console.log('Rating submitted successfully', response);
        this.modalService.dismissAll();
      }, error => {
        console.error('Error submitting rating', error);
      });
      */
      
      this.modalService.dismissAll();
    }
  }





  
}
