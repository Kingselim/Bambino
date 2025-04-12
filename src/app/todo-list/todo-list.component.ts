import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ForumService } from '../service/forum.service';
interface Task {
  text: string;
  status: 'todo' | 'inProgress' | 'done';
  date?: string;
  time?: string;
  
}

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {
  idPregnancyTracking!: number;

  newTask: Task = {
    text: '',
    status: 'todo',
    date: '',
    time: '',
    
  };

  tasks: Task[] = [];
  statuses: Array<'todo' | 'inProgress' | 'done'> = ['todo', 'inProgress', 'done'];

  
  
  constructor(
    private route: ActivatedRoute, 
       private forumService: ForumService
  ) {
    
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.idPregnancyTracking = +params['id'];
      this.tasks = this.forumService.tasks || [];

    });
  }
  addTask(): void {
    if (!this.newTask.text.trim() || !this.newTask.date || !this.newTask.time) {
      alert('Merci de compléter tous les champs.');
      return;
    }
  
    const existing = this.tasks.find(
      t => t.date === this.newTask.date && t.time === this.newTask.time && t.status !== 'done'
    );
  
    if (existing) {
      alert('⚠️ Une tâche non terminée existe déjà à cette date et heure.');
      return;
    }
  
    this.tasks.push({ ...this.newTask });
  
    // ✅ Mise à jour dans le service pour garder les données même après navigation
    this.forumService.tasks = [...this.tasks];
  
    this.resetNewTask();
  }

  toggleStatus(index: number): void {
    const task = this.tasks[index];
    if (task.status === 'todo') task.status = 'inProgress';
    else if (task.status === 'inProgress') task.status = 'done';
    else task.status = 'todo';
  }

  removeTask(index: number): void {
    this.tasks.splice(index, 1);
  }

  getTasksByStatus(status: 'todo' | 'inProgress' | 'done'): Task[] {
    return this.tasks.filter(task => task.status === status);
  }

  getTitle(status: 'todo' | 'inProgress' | 'done'): string {
    switch (status) {
      case 'todo':
        return '📋 À faire';
      case 'inProgress':
        return '🚧 En cours';
      case 'done':
        return '✅ Terminée';
      default:
        return '';
    }
  }

  private resetNewTask(): void {
    this.newTask = {
      text: '',
      status: 'todo',
      date: '',
      time: ''
    };
  }
}
