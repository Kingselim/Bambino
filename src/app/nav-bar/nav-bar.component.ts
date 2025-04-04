import { Component } from '@angular/core';
import { SharedService } from '../services/shared.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  currentExpertId = 1; // Or get this from a service

  constructor(private sharedService: SharedService) {
    this.sharedService.setExpertId(this.currentExpertId);
  }
}
