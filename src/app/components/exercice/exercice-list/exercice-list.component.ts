import { Component, OnInit } from '@angular/core';
import { Exercice } from 'src/app/model/exercice.model';
import { ExerciceService } from 'src/app/service/exercice.service';
import { ActivatedRoute } from '@angular/router';
import { ExerciceReactionService } from 'src/app/service/exercice-reaction.service';
import { ReactionCount } from 'src/app/model/exercice-reaction.model';

@Component({
  selector: 'app-exercice-list',
  templateUrl: './exercice-list.component.html',
})
export class ExerciceListComponent implements OnInit {
  exercices: Exercice[] = []; // Exercices filtrés à afficher
  allExercicesByCoaching: Exercice[] = []; // Exercices du coaching actuel
  coachingId!: number;
  selectedDifficulty: string = '';

  exercice: Exercice = new Exercice();
  selectedExerciceId: number | null = null; // <-- Pour voir les détails
  difficulties = ['Easy', 'Medium', 'Hard'];
  isEditing = false;

  reactionCounts: { [exerciceId: number]: ReactionCount } = {};

  constructor(private exerciceService: ExerciceService,     
    private reactionService: ExerciceReactionService,
    public route: ActivatedRoute) {}

    ngOnInit(): void {
      this.route.paramMap.subscribe(params => {
        const idParam = params.get('id');
        if (idParam) {
          this.coachingId = +idParam;
          this.loadExercicesByCoaching();
        }
      });
    }

  loadExercicesByCoaching(): void {
    this.exerciceService.getAllExercices().subscribe(data => {
      this.allExercicesByCoaching = data.filter(e => e.coaching?.idCoaching === this.coachingId);
      this.exercices = [...this.allExercicesByCoaching];
      this.exercices.forEach(ex => this.loadReactions(ex.idExercice));
    });
  }

  save(): void {
    this.exercice.coaching = { idCoaching: this.coachingId } as any;
    if (this.isEditing) {
      this.exerciceService.updateExercice(this.exercice.idExercice, this.exercice).subscribe(() => {
        this.resetForm();
        this.loadExercicesByCoaching();
      });
    } else {
      this.exerciceService.addExercice(this.exercice).subscribe(() => {
        this.resetForm();
        this.loadExercicesByCoaching();
      });
    }
  }

  editExercice(ex: Exercice): void {
    this.exercice = { ...ex };
    this.isEditing = true;
  }

  filterByDifficulty(): void {
    if (this.selectedDifficulty) {
      this.exercices = this.allExercicesByCoaching.filter(ex => ex.difficulty === this.selectedDifficulty);
    } else {
      this.exercices = [...this.allExercicesByCoaching];
    }
  }

  deleteExercice(id: number): void {
    this.exerciceService.deleteExercice(id).subscribe(() => {
      this.exercices = this.exercices.filter(e => e.idExercice !== id);
    });
  }

  resetForm(): void {
    this.exercice = new Exercice();
    this.isEditing = false;
  }

  toggleDetails(id: number): void {
    this.selectedExerciceId = this.selectedExerciceId === id ? null : id;
  }

  loadReactions(exerciceId: number): void {
    this.reactionService.getReactionCount(exerciceId).subscribe(data => {
      this.reactionCounts[exerciceId] = data;
    });
  }

  like(exerciceId: number): void {
    this.reactionService.react(exerciceId, 'LIKE').subscribe(() => {
      this.loadReactions(exerciceId);
    });
  }

  dislike(exerciceId: number): void {
    this.reactionService.react(exerciceId, 'DISLIKE').subscribe(() => {
      this.loadReactions(exerciceId);
    });
  }
}
