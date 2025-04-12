import { Component, OnInit } from '@angular/core';
import { Forum } from '../model/Forum';
import { ForumService } from 'src/app/service/forum.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ChartDataset, ChartOptions, Chart, registerables } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { TodoListComponent } from '../todo-list/todo-list.component';
Chart.register(...registerables, annotationPlugin);

@Component({
  selector: 'app-semester-tracking',
  templateUrl: './semester-tracking.component.html',
  styleUrls: ['./semester-tracking.component.css']
})
export class SemesterTrackingComponent implements OnInit {
  semesterForm: FormGroup;
  idPregnancyTracking: number | null = null;
  currentTrimester: number = 1;
  trackings: Forum[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  selectedForumId: number | null = null;
  isEditing: boolean = false;
  savedTrimesters: number[] = [];
  labels: string[] = [];
  currentView: 'form' | 'todo' = 'form';
  tasks: { text: string; done: boolean }[] = [];
  newTask: string = '';
  weightData: ChartDataset<'line'>[] = [
    { data: [], label: 'Poids (kg)', tension: 0.4 }
  ];

  pressureData: ChartDataset<'line'>[] = [
    { data: [], label: 'Tension (mmHg)', tension: 0.4 }
  ];

  weightChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        min: 40,
        max: 100,
        title: {
          display: true,
          text: 'Poids (kg)'
        }
      }
    },
    plugins: {
      annotation: {
        annotations: {
          weightLimit: {
            type: 'line',
            yMin: 80,
            yMax: 80,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              enabled: true,
              content: '⚠ Limite poids (80kg)',
              color: 'red',
              position: 'end'
            }
          }
        }
      }
    }
  };

  pressureChartOptions: ChartOptions<'line'> = {
    responsive: true,
    scales: {
      y: {
        min: 5,
        max: 15,
        title: {
          display: true,
          text: 'Tension (mmHg)'
        }
      }
    },
    plugins: {
      annotation: {
        annotations: {
          pressureLimit: {
            type: 'line',
            yMin: 14,
            yMax: 14,
            borderColor: 'red',
            borderWidth: 2,
            label: {
              enabled: true,
              content: '⚠ Limite tension (14)',
              color: 'red',
              position: 'end'
            }
          }
        }
      }
    }
  };

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {
    this.semesterForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(30)]],
      bloodPressure: ['', [Validators.required]],
      symptoms: ['', [Validators.maxLength(255)]],
      pregnancyPain: ['', [Validators.maxLength(255)]],
      pregnancyCravings: ['', [Validators.maxLength(255)]],
      moodSwings: ['', [Validators.required]],
      description: ['', [Validators.maxLength(255)]],
      breathelessness: ['', [Validators.maxLength(255)]]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idPregnancyTracking = +id;
      if (!isNaN(this.idPregnancyTracking)) {
        this.loadTrackings();
      } else {
        this.errorMessage = 'ID de grossesse invalide';
      }
    });
  }

  onSubmit(): void {
    if (!this.idPregnancyTracking || this.semesterForm.invalid) {
      this.semesterForm.markAllAsTouched();
      this.errorMessage = 'Formulaire invalide';
      return;
    }

    const forum: Forum = {
      idForum: this.selectedForumId ?? undefined,
      month: this.currentTrimester,
      weight: this.semesterForm.value.weight,
      bloodPressure: this.semesterForm.value.bloodPressure,
      symptoms: this.semesterForm.value.symptoms,
      pregnancyPain: this.semesterForm.value.pregnancyPain,
      pregnancyCravings: this.semesterForm.value.pregnancyCravings,
      moodSwings: this.semesterForm.value.moodSwings,
      description: this.semesterForm.value.description,
      breathelessness: this.semesterForm.value.breathelessness,
     /* pregnancyTracking: {
        idPregnancyTracking: this.idPregnancyTracking
      }*/
        idPregnancyTracking: this.idPregnancyTracking! // ✅ on envoie juste l’ID à plat

    };

    const request$ = this.selectedForumId
      ? this.forumService.updateForum(this.selectedForumId, forum)
      : this.forumService.addForum(forum);

    request$.subscribe({
      next: (updatedForum) => {
        alert(this.selectedForumId ? '✅ Mise à jour réussie' : '✅ Enregistrement réussi');

        if (!this.savedTrimesters.includes(this.currentTrimester)) {
          this.savedTrimesters.push(this.currentTrimester);
        }

        const index = this.trackings.findIndex(t => t.month === this.currentTrimester);
        if (index !== -1) {
          this.trackings[index] = { ...updatedForum };
        } else {
          this.trackings.push({ ...updatedForum });
        }

        this.selectedForumId = updatedForum.idForum ?? null;
        this.isEditing = true;
        this.semesterForm.patchValue(updatedForum);

        this.updateCharts();
      },
      error: () => {
        this.errorMessage = 'Erreur lors de l\'enregistrement ou mise à jour';
      }
    });
  }

  updateCharts(): void {
    const filtered = this.trackings
      .filter(t => t.month <= this.currentTrimester)
      .sort((a, b) => a.month - b.month);

    this.labels = filtered.map(t => `T${t.month}`);
    this.weightData[0].data = filtered.map(t => t.weight);
    this.pressureData[0].data = filtered.map(t => +(t.bloodPressure ?? 0));
  }
  // 👉 Méthode pour changer d'affichage
  toggleView(view: 'form' | 'todo') {
    this.currentView = view;
  }
  addTask() {
    if (this.newTask.trim()) {
      this.tasks.push({ text: this.newTask.trim(), done: false });
      this.newTask = '';
    }
  }
  
  removeTask(index: number) {
    this.tasks.splice(index, 1);
  }
  
  toggleDone(index: number) {
    this.tasks[index].done = !this.tasks[index].done;
  }
  nextTrimester(): void {
    if (this.currentTrimester < 3) {
      this.currentTrimester++;
      this.loadTrimesterData();
    }
  }

  previousTrimester(): void {
    if (this.currentTrimester > 1) {
      this.currentTrimester--;
      this.loadTrimesterData();
    }
  }

  loadTrimester(trimester: number): void {
    if (trimester >= 1 && trimester <= 3) {
      this.currentTrimester = trimester;
      this.loadTrimesterData();
    }
  }

  private loadTrimesterData(): void {
    const data = this.trackings.find(t => t.month === this.currentTrimester);
    if (data) {
      this.selectedForumId = data.idForum ?? null;
      this.isEditing = true;
      this.semesterForm.patchValue(data);
    } else {
      this.selectedForumId = null;
      this.isEditing = false;
      this.semesterForm.reset();
    }
  }

  loadTrackings(): void {
    if (!this.idPregnancyTracking) return;

    this.isLoading = true;
    this.forumService.getForumsByPregnancy(this.idPregnancyTracking).subscribe({
      next: (data) => {
        this.trackings = data;
        this.savedTrimesters = data.map(item => item.month);
        this.isLoading = false;
        this.loadTrimesterData();
        this.updateCharts();
      },
      error: (error) => {
        console.error('Erreur de chargement:', error);
        this.isLoading = false;
        this.errorMessage = 'Erreur lors du chargement des données';
      }
    });
  }
}
