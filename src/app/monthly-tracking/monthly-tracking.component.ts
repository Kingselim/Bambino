import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Forum } from '../model/Forum';
import { HttpErrorResponse } from '@angular/common/http';
import { ForumService } from 'src/app/service/forum.service';
import { ChartDataset, ChartOptions ,Chart, registerables} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation'; // ✅ plugin des annotations

Chart.register(...registerables, annotationPlugin);
@Component({
  selector: 'app-monthly-tracking',
  templateUrl: './monthly-tracking.component.html',
  styleUrls: ['./monthly-tracking.component.css']
})
export class MonthlyTrackingComponent implements OnInit {
  monthlyForm: FormGroup;
  idPregnancyTracking: number | null = null;
  currentMonth: number = 1;
  trackings: Forum[] = [];
  isLoading: boolean = false;
  errorMessage: string | null = null;
  selectedForumId: number | null = null;
  isEditing: boolean = false;
  savedMonths: number[] = [];
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
  
  // 🔵 Options pour le graphique de poids
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

// 🔴 Options pour le graphique de tension
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

  updateCharts(): void {
    // Filtrer les mois enregistrés jusqu'au mois courant
    const filtered = this.trackings
      .filter(t => t.month <= this.currentMonth)
      .sort((a, b) => a.month - b.month); // assure l'ordre croissant
  
    this.labels = filtered.map(t => `Mois ${t.month}`);
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
  
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private forumService: ForumService
  ) {
    this.monthlyForm = this.fb.group({
      weight: ['', [Validators.required, Validators.min(30)]],
      bloodPressure: ['', Validators.required],
      symptoms: ['', Validators.required],
      pregnancyPain: ['', Validators.required],
      pregnancyCravings: ['', Validators.required],
      moodSwings: ['', Validators.required],
      description: ['', Validators.required],
      breathelessness: ['', Validators.required]
    });
  }

  /*ngOnInit(): void {
    this.route.params.subscribe(params => {
      const id = params['id'];
      this.idPregnancyTracking = +id;
      if (!isNaN(this.idPregnancyTracking)) {
        this.loadTrackings();
      } else {
        this.errorMessage = 'ID de grossesse invalide';
      }
    });
  }*/
    ngOnInit(): void {
      this.route.params.subscribe(params => {
        const id = +params['id'];
        const reloadToken = this.route.snapshot.queryParamMap.get('reload');
      
      
    
        if (!isNaN(id)) {
          const cachedTrackings = this.forumService.trackings;
    
          // ✅ Vérifie si le cache correspond au bon suivi
          if (
            cachedTrackings.length > 0 &&
            cachedTrackings[0]?.idPregnancyTracking === id // ✅ au lieu de .pregnancyTracking.idPregnancyTracking
          ) {
            this.trackings = cachedTrackings;
            this.savedMonths = cachedTrackings.map(t => t.month);
            this.loadMonthData();
            this.updateCharts();
          } else {
            this.idPregnancyTracking = id; // 🟢 à mettre avant le this.loadTrackings()

            this.loadTrackings(); // 🔁 sinon, re-fetch depuis backend
          }
        } else {
          this.errorMessage = 'ID de grossesse invalide';
        }
      });
    }
    

  onSubmit(): void {
    if (!this.idPregnancyTracking || this.monthlyForm.invalid) {
      this.monthlyForm.markAllAsTouched();
      this.errorMessage = 'Formulaire invalide';
      return;
    }

    const forum: Forum = {
      idForum: this.selectedForumId ?? undefined,
      month: this.currentMonth,
      weight: this.monthlyForm.value.weight,
      bloodPressure: this.monthlyForm.value.bloodPressure,
      symptoms: this.monthlyForm.value.symptoms,
      pregnancyPain: this.monthlyForm.value.pregnancyPain,
      pregnancyCravings: this.monthlyForm.value.pregnancyCravings,
      moodSwings: this.monthlyForm.value.moodSwings,
      description: this.monthlyForm.value.description,
      breathelessness: this.monthlyForm.value.breathelessness,
      /*pregnancyTracking: {
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
      
          if (!this.savedMonths.includes(this.currentMonth)) {
            this.savedMonths.push(this.currentMonth);
          }
      
          const index = this.trackings.findIndex(t => t.month === this.currentMonth);
          if (index !== -1) {
            this.trackings[index] = { ...updatedForum };
          } else {
            this.trackings.push({ ...updatedForum });
          }
      
          this.selectedForumId = updatedForum.idForum ?? null;
          this.isEditing = true;
          this.monthlyForm.patchValue(updatedForum);
      
          // ✅ Appelle ici, bien dans le bloc `next`
          this.updateCharts();
        },
        error: () => {
          this.errorMessage = "Erreur lors de l'enregistrement ou mise à jour";
        }
      });
      
  }

  nextMonth(): void {
    if (this.currentMonth < 9) {
      this.currentMonth++;
      this.loadMonthData();
    }
  }

  previousMonth(): void {
    if (this.currentMonth > 1) {
      this.currentMonth--;
      this.loadMonthData();
    }
  }

  loadMonth(month: number): void {
    if (month >= 1 && month <= 9) {
      this.currentMonth = month;
      this.loadMonthData();
    }
  }

  private loadMonthData(): void {
    const monthData = this.trackings.find(t => t.month === this.currentMonth);
    if (monthData) {
      this.selectedForumId = monthData.idForum ?? null;
      this.isEditing = true;
      this.monthlyForm.patchValue({
        weight: monthData.weight,
        bloodPressure: monthData.bloodPressure,
        symptoms: monthData.symptoms,
        pregnancyPain: monthData.pregnancyPain,
        pregnancyCravings: monthData.pregnancyCravings,
        moodSwings: monthData.moodSwings,
        description: monthData.description,
        breathelessness: monthData.breathelessness
        
      });
    } else {
      this.selectedForumId = null;
      this.isEditing = false;
      this.monthlyForm.reset();
    }
  }
  

  loadTrackings(): void {
    if (this.forumService.trackings.length) {
      this.trackings = this.forumService.trackings;
      this.savedMonths = this.trackings.map(item => item.month);
      this.loadMonthData();
      this.updateCharts();
    } else {
      this.forumService.getForumsByPregnancy(this.idPregnancyTracking!).subscribe({
        next: (data) => {
          this.trackings = data;
          this.savedMonths = data.map(item => item.month);
          this.forumService.trackings = data; // ✅ CACHER LES DONNÉES
          this.isLoading = false;
          this.loadMonthData();
          this.updateCharts();
        }
        
      });
    }
  }
}
