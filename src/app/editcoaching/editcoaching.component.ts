import { Component, OnInit } from '@angular/core';
import { CoachingService } from 'src/app/service/coaching.service';
import { Coaching } from 'src/app/model/coaching.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-coaching',
  templateUrl: './editcoaching.component.html',
  styleUrls: ['./editcoaching.component.css']
})
export class EditCoachingComponent implements OnInit {

  coaching: Coaching = new Coaching();

  constructor(
    private coachingService: CoachingService,
    private route: ActivatedRoute,
    public router: Router  // Make it public
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getCoachingById(+id);
    }
  }

  getCoachingById(id: number): void {
    this.coachingService.getCoachingById(id).subscribe({
      next: (data) => {
        this.coaching = data;
      },
      error: (error) => {
        console.error('Erreur lors de la récupération du coaching', error);
      }
    });
  }
  onSubmit(): void { this.coachingService.updateCoaching(this.coaching).subscribe({
     next: () => { alert('✅ Coaching modifié avec succès !'); 
      this.router.navigateByUrl('/', { skipLocationChange: true })
      .then(() => { this.router.navigate(['/coaching']); }); }, 
      error: (err) => { console.error('Erreur lors de la modification du coaching',
         err); alert('❌ Une erreur est survenue lors de la modification.'); }
         });
         }
}
