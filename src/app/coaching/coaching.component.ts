import { Component, OnInit } from '@angular/core';
import { CoachingService } from 'src/app/service/coaching.service';
import { Coaching } from 'src/app/model/coaching.model';

@Component({
  selector: 'app-coaching',
  templateUrl: './coaching.component.html',
  styleUrls: ['./coaching.component.css']
})
export class CoachingComponent implements OnInit {

  coachings: Coaching[] = [];
  isLoading = false;
  errorMessage = '';
  itemsPerPage = 3; // nombre d'exercices par page
currentPage = 1;
paginatedCoachings: Coaching[] = [];

  constructor(private coachingService: CoachingService) {}

  ngOnInit(): void {
    this.getAllCoachings();
  }

  getAllCoachings(): void {
    this.isLoading = true;
    this.coachingService.getAllCoachings().subscribe({
      next: (data) => {
        this.coachings = data;
        this.paginatedCoachings = data;  // Remplis directement les coachings paginés sans pagination pour tester
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Erreur lors du chargement des coachings.';
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  onDelete(id: number): void {
    const confirmDelete = confirm('Êtes-vous sûr de vouloir supprimer ce coaching ?');
    if (confirmDelete) {
      this.coachingService.deleteCoaching(id).subscribe({
        next: () => {
          this.coachings = this.coachings.filter(c => c.idCoaching !== id);
        },
        error: (err) => {
          alert('Erreur lors de la suppression.');
          console.error(err);
        }
      });
    }
  }

  loadCoachings(): void {
   this.coachingService.getAllCoachings().subscribe(data => {
      this.coachings = data;
      this.applyPagination();
    });
  }

  applyPagination(): void {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    const end = start + this.itemsPerPage;
    this.paginatedCoachings = this.coachings.slice(start, end);
  }
  get totalPages(): number {
    return Math.ceil(this.coachings.length / this.itemsPerPage);
  }
  
  totalPagesArray(): number[] {
    return Array(this.totalPages).fill(0).map((_, i) => i + 1);
  }
  
  goToPage(page: number): void {
    this.currentPage = page;
    this.applyPagination();
  }
  
  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.applyPagination();
    }
  }
  
  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.applyPagination();
    }
  }
}
