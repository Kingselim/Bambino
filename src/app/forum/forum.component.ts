import { ForumService } from './../service/forum.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  ForumForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private forumService: ForumService,
    private router: Router
  ) {}

  ngOnInit() {
    this.ForumForm = this.fb.group({
      month: ['', Validators.required],
      weight: ['', [Validators.required, Validators.min(0)]], // Added min validator for realistic weight check
      bloodPressure: ['', Validators.required],
      description: [''],
      symptoms: [''],
      painLevel: ['', Validators.required],
      cravings: [''],
      moodSwings: [''],
      breathlessness: ['']
    });
  }

  onSubmit() {
    if (this.ForumForm.valid) {
      this.forumService.addForum(this.ForumForm.value).subscribe({
        next: (response) => {
          console.log('Pregnancy tracking data submitted successfully:', response);
          alert('Suivi enregistré avec succès!');
          // Example of conditional navigation after submission
          this.router.navigate(['/thank-you']); // Assuming you have a thank-you route
        },
        error: (error) => {
          console.error('Failed to submit pregnancy tracking data:', error);
          alert('Erreur lors de l\'enregistrement du suivi!');
        }
      });
    } else {
      // Optionally handle the form being invalid
      console.error('Form is not valid:', this.ForumForm.value);
      alert('Please fill all the required fields correctly!');
    }
  }
}
