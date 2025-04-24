import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BabyService } from 'src/app/service/baby.service';
import { Baby } from 'src/app/model/baby';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { formatDate } from '@angular/common';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/service/auth.service';
@Component({
  selector: 'app-baby-form',
  templateUrl: './baby-form.component.html',
  styleUrls: ["./baby-form.component.css"
  ]
})
export class BabyFormComponent implements OnInit {
  @ViewChild('babyForm') babyForm!: NgForm;

  baby: Baby = {
    name: '',
    age: 0,
    dateOfBirth: '',
    gender: '',
    medicalCondition: '',
    specialNeeds: '',
    favoriteActivities: '',
    emergencyContact: ''
  };

  isEditMode = false;

  constructor(
    private babyService: BabyService,
    private route: ActivatedRoute,
    private router: Router,
    private toastr: ToastrService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.babyService.getById(+id).subscribe({
        next: data => {
          this.baby = {
            ...data,
            userPatient: data.userPatient, // 👈 garde le parent lié
            dateOfBirth: this.formatDateToInput(data.dateOfBirth)
          };
        },
        error: err => console.error('Erreur de chargement', err)
      });
      
    }
  }

  // onSubmit(): void {
  //   if (this.babyForm.valid) {
  //     const currentUser = this.authService.getCurrentUser();
  //       this.baby.userPatient = { id: currentUser.id };

  //     this.babyService.addBaby(this.baby).subscribe({
  //       next: () => {
  //         this.toastr.success('Baby added successfully 👶', 'Success!');
  //         this.router.navigate(['/BabySitting']);
  //       },
  //       error: err => {
  //         console.error("❌ Error adding baby:", err);
  //         this.toastr.error('Something went wrong. Please try again.', 'Error');
  //       }
  //     });
  //   }
  // }  
  onSubmit(): void {
    if (this.babyForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      this.baby.userPatient = { id: currentUser.id };
  
      if (this.isEditMode) {
        this.babyService.updateBaby(this.baby.idBaby!, this.baby).subscribe({
          next: () => {
            this.toastr.success('Baby updated successfully 👶', 'Success!');
            this.router.navigate(['/babysitting/babies']);
          },
          error: err => {
            console.error("❌ Error updating baby:", err);
            this.toastr.error('Something went wrong. Please try again.', 'Error');
          }
        });
      } else {
        this.babyService.addBaby(this.baby).subscribe({
          next: () => {
            this.toastr.success('Baby added successfully 👶', 'Success!');
            this.router.navigate(['/BabySitting']);
          },
          error: err => {
            console.error("❌ Error adding baby:", err);
            this.toastr.error('Something went wrong. Please try again.', 'Error');
          }
        });
      }
    }
  }
  

  formatDateToInput(date: Date | string): string {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = ('0' + (d.getMonth() + 1)).slice(-2);
    const day = ('0' + d.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }
  
}