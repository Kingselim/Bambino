import { Component, OnInit } from '@angular/core';
import { BabyService } from 'src/app/service/baby.service';
import { Router } from '@angular/router';
import { Baby } from 'src/app/model/baby';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-baby-list',
  templateUrl: './baby-list.component.html',
  styleUrls: ["./baby-list.component.css",
    "../../../../assets/BackOffice/assets/css/bootstrap.min.css",
              "../../../../assets/BackOffice/assets/css/demo.css",
              "../../../../assets/BackOffice/assets/css/fonts.css",
              "../../../../assets/BackOffice/assets/css/fonts.min.css",
              "../../../../assets/BackOffice/assets/css/kaiadmin.css",
              "../../../../assets/BackOffice/assets/css/kaiadmin.min.css"

  ]
})
export class BabyListComponent implements OnInit {
  babies: Baby[] = [];

  constructor(private babyService: BabyService, private router: Router) {}

  ngOnInit(): void {
    this.loadBabies();
  }

  loadBabies(): void {
    this.babyService.getAll().subscribe({
      next: (data) => {
        this.babies = data;
      },
      error: (err) => {
        console.error('Error loading babies:', err);
      }
    });
  }

  // ✅ Édition
  onEdit(id: number): void {
    this.router.navigate(['/backoffice/baby-form', id]);
  }

  // ✅ Suppression
  onDelete(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'This action cannot be undone!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#e3342f',
      cancelButtonColor: '#6c757d'
    }).then((result) => {
      if (result.isConfirmed) {
        this.babyService.deleteBaby(id).subscribe({
          next: () => {
            this.babies = this.babies.filter(b => b.idBaby !== id);
            Swal.fire({
              icon: 'success',
              title: 'Deleted!',
              text: 'The baby has been successfully deleted.',
              showConfirmButton: false,
              timer: 1500
            });
          },
          error: (err) => {
            console.error('Error deleting baby:', err);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: 'Something went wrong while deleting!'
            });
          }
        });
      }
    });
  }
}
