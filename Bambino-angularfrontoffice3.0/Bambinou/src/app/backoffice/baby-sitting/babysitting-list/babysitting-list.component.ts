import { Component, OnInit } from '@angular/core';
import { Babysitting } from 'src/app/model/Babysitting';
import { BabysittingService } from 'src/app/service/babysitting.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-babysitting-list',
  templateUrl: './babysitting-list.component.html',
  styleUrls: ["./babysitting-list.component.css",
    "../../../../assets/BackOffice/assets/css/bootstrap.min.css",
              "../../../../assets/BackOffice/assets/css/demo.css",
              "../../../../assets/BackOffice/assets/css/fonts.css",
              "../../../../assets/BackOffice/assets/css/fonts.min.css",
              "../../../../assets/BackOffice/assets/css/kaiadmin.css",
              "../../../../assets/BackOffice/assets/css/kaiadmin.min.css"]
})
export class BabysittingListComponent implements OnInit {
  babysittings: Babysitting[] = [];
  selectedStatus: string = '';

  constructor(
    private babysittingService: BabysittingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadBabysittings();
  }

  loadBabysittings(): void {
    this.babysittingService.getAll().subscribe({
      next: (data) => this.babysittings = data,
      error: (err) => console.error('Erreur lors du chargement des babysittings', err)
    });
  }

  filteredBabysittings(): Babysitting[] {
    if (!this.selectedStatus) {
      return this.babysittings;
    }
    return this.babysittings.filter(b => b.status === this.selectedStatus);
  }

  onEditBabysitting(id: number): void {
    this.router.navigate(['/backoffice/babysittings/edit', id]);
  }  

  onDeleteBabysitting(id: number): void {
    if (confirm('Are you sure you want to delete this babysitting contract?')) {
      this.babysittingService.delete(id).subscribe({
        next: () => this.loadBabysittings(),
        error: (err) => console.error('Erreur lors de la suppression', err)
      });
    }
  }

  getStatusClass(status: string): string {
    switch (status) {
      case 'confirmé': return 'badge bg-success';
      case 'en attente': return 'badge bg-warning text-dark';
      case 'annulé': return 'badge bg-danger';
      default: return 'badge bg-secondary';
    }
  }
  deleteContract(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.babysittingService.delete(id).subscribe({
          next: () => {
            Swal.fire('Deleted!', 'The contract has been deleted.', 'success');
            this.loadBabysittings(); // ou mise à jour de la liste
          },
          error: (err) => {
            console.error(err);
            Swal.fire('Error', 'Something went wrong.', 'error');
          }
        });
      }
    });
  }
  
}
